const express = require('express');

const routes = express.Router();
const Author = require('../models/Author');
const { authMiddleware } = require('../middleware');

routes.use(authMiddleware);
routes.get('/:id', Author.getById);
routes.get('/search', Author.getSearchByNameMaxPrice);
routes.get('/', Author.get);

routes.post('/', Author.post);

routes.put('/:id', Author.putById);

routes.delete('/:id', Author.deleteById);

routes.all('*', Author.notFound);

module.exports = routes;