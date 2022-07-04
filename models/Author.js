// const mysql= require('mysql2/promise');
const fs = require('../helprs/fs');
const db = require('./db');

const ID_NAO_ENCONTRADO = '<-- Id não encontrado -->';
const GET_BY_ID = 'SELECT * FROM db.person WHERE id = ?';

const get = async (req, res, next) => {
  try { 
    const [items] = await db.execute('SELECT * FROM db.person');
    console.table(items);
    return res.status(200).json(items);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
   };

const getById = async (req, res, next) => {
  const sql = GET_BY_ID;
  try {    
    const { id } = req.params;
    const [[items]] = await db.query(sql, [id]);
    if (items.length === 0) { 
      return next({ status: 404, message: ID_NAO_ENCONTRADO });
    }
    return res.status(200).json(items);
  } catch (error) {
    return next({ status: 500, message: error.message });
  }
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
  const sqlInsert = 'INSERT INTO db.person (name, age, endereco) VALUES (?, ?, ?)';
  const sqlGet = GET_BY_ID;
  try {
    const { name, age, endereco } = req.body;
    const [{ insertId }] = await db.query(sqlInsert, [name, age, endereco]);
    const [[item]] = await db.query(sqlGet, [insertId]);
    return res.status(201).json(item);
  } catch (error) {
    next(error);  
  }  
};

const putById = async (req, res, next) => {
  const sqlGet = GET_BY_ID;
  const sqlUpdate = 'UPDATE db.person SET name = ?, age = ?, endereco = ? WHERE id = ?';
 
  try {
    const id = Number(req.params.id);
    const [[oldItem]] = await db.query(sqlGet, [id]);
    if (!oldItem) {
      return next({ status: 404, message: ID_NAO_ENCONTRADO });
    }
    const changes = req.body; 
    const newItem = { ...oldItem, ...changes };
    await db.query(sqlUpdate, [newItem.name, newItem.age, newItem.endereco, id]);
    res.status(200).json(newItem);
  } catch (error) {
    next(error);
  }
};    

const deleteById = async (req, res, next) => {
  const sql = 'DELETE FROM db.person WHERE id = ?';
  try {
    const { id } = req.params;
    const result = await db.query(sql, [id]);
    const item = result[0];
    if (item.affectedRows === 0) { 
      return next({ status: 404, message: ID_NAO_ENCONTRADO });
    }
    return res.status(200).json({ message: '<-- Id deletado -->' });
  } catch (error) {
    next(error);
  }
};
const notFound = (req, res, next) => {
  try {
    return next({ status: 404, message: '<-- Não encontrado -->' });
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