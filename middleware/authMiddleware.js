/* auth-middleware.js */

const validUser = {
  username: 'link77',
  password: '1234'
};

module.exports =  (req, res, next) => {
  const { username, password } = req.headers;
  const token = req.headers.authorization;
  if (!token ||token === undefined) {
    return next({status:401, message: '<-- Sem token -->'});
  }
  if (!username || !password) {
    return next({status:401, message: '<--Nome ou senha inxistentes!-->' });
  }
    if(username !== validUser.username ||  password !== validUser.password) {
    return next({ status:401, message: '<--Nome ou senha não autorizados!-->' });
  }
next();  
};

