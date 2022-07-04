const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middleware');
const { start } = require('./helprs/fs');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

app.use('/person', require('./router/recipesRouter'));

app.use(errorHandler);
console.clear();
app.listen(port, start(port));

// app.use((req, _res, next) => {
//   console.log('req.method:', req.method);
//   console.log('req.path:', req.path);
//   console.log('req.params:', req.params);
//   console.log('req.query:', req.query);
//   console.log('req.headers:', req.headers);
//   console.log('req.body:', req.body);
//   next();
// });
