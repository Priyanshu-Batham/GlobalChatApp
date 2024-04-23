const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});