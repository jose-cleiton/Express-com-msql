const fs = require('../helprs/fs');

const ID_NAO_ENCONTRADO = '<-- Id não encontrado -->';

const get = async (req, res, next) => {
      const data = await fs.read();
      if (data.length === 0) {
        return next({ status: 404, message: '<-- Dados inexistentes -->' });
      }
      return res.status(200).json(data);
};

const getById = async (req, res, next) => {  
  try {    
    const { id } = req.params;
    const data = await fs.read();
    const idExists = data.find((r) => r.id === Number(id));  
      
    if (!idExists) {
      return next({ status: 404, message: ID_NAO_ENCONTRADO });     
    }
    return res.status(200).json(idExists);    
  } catch (error) {
    next(error);
  }
  
  next();
};
const getSearchByNameMaxPrice = async (req, res, next) => {
  try {
    const { name, maxAge } = req.query;
    if (!name || !maxAge) {
      return next({ status: 400, message: '<-- Nome ou preço máximo não informado -->' });
    }
    const data = await fs.read();
    const recipes = data.filter((u) => u.name
      .toLowerCase()
      .includes(name
        .toLowerCase()) && u.age < maxAge);   
    if (recipes.length === 0) {
      return next({ status: 404, message: '<-- Nome e preços incompatíveis -->' });
    }
    return res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }   
};

const post = async (req, res, next) => {  
  try {
    const { name, age, endereco } = req.body;
    const data = await fs.read();
    data.push({ 
      id: data.length,
      name, 
      age, 
      endereco });
    await fs.write(data);
    return res.status(201).json({ 
      id: data.length,
      name, 
      age, 
      endereco,
    });
  } catch (error) {
    next(error);  
  }  
};

const putById = async (req, res, next) => {
    try {
      const { id } = req.params;
        const { name, age, endereco } = req.body;
        const data = await fs.read();
        const recipeIndex = data.findIndex((r) => r.id === Number(id));
        if (recipeIndex === -1) return next({ status: 404, message: '<-- Id não rncontrado -->' });
        data[recipeIndex] = { 
          id: Number(id),
          name, 
          age, 
          endereco };
        await fs.write(data);
        return res.status(200).json(data[recipeIndex]);
    } catch (error) {
      next(error);
    }  
};
const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fs.read();
    const recipeIndex = data.findIndex((r) => r.id === Number(id));
    if (recipeIndex === -1) return next({ status: 404, message: '<-- Id não rncontrado -->' });
    data.splice(recipeIndex, 1);
    await fs.write(data);
    return res.status(204).json({ message: '<-- Id removido -->' });
  } catch (error) {
    next(error);
  }
};
const notFound = (req, res, next) => {
  try {
    return next({ status: 404, message: ID_NAO_ENCONTRADO });
  } catch (error) {
    next(error);
  }
};
module.exports = {
    get,
    getById,
    getSearchByNameMaxPrice,
    post,
    putById,
    deleteById,
    notFound,
};