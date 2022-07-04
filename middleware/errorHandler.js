const ValidationError = require('./ValidationError');
module.exports =  (err, req, res, next) => {
  if(err instanceof ValidationError) {
    return res.status(404).json({message: err.message});
  }
  console.log(`Status: ${err.status} Mensagem de Erro: ${err.message} `);
  res.status(err.status|| 500).json({message :err.message});
  next();
};


