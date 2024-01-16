// config/db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shashisdktech:Shashi0619...@pawnshop.e2bwr7b.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}

const port = 3000;

module.exports = { connectToDatabase, client, port };


