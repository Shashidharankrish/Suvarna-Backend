const express = require('express');
const { connectToDatabase } = require('./src/config/database');
const app = express();
const {port} = require('./src/config/database');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/login', (req, res) => {
  res.send('Ok')
})

connectToDatabase()
  .then(() => {
    // MongoDB connected successfully, start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });