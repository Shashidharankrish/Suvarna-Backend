// server.js or index.js (your main server script)
const app = require('./src/config/express');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');
const connectDB = require('./src/config/database'); // Import your connectDB module

const PORT = process.env.PORT || 3000;

// Add CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB()
  .then(() => {
    // Attach user routes after successful connection
    app.use('/api/users', userRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  });
