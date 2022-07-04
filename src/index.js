const express = require('express');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const store = { data: [], index: 0 };

/** ListenPerson */
app.get('/person', (req, res) => {
  const items = store.data;  
  res.json(items);
});
 
/** addPerson */
app.post('/person', (req, res) => {
  const data = req.body;
  store.index += 1;
  const id = store.index;
  const item = { ...data, id };
  store.data.push(item);
 return res.status(201).json(item);
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});