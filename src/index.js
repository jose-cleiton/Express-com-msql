const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

const store = { data: [], index: 0 };

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});