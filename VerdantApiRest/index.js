const dotenv = require('dotenv')
const multer = require('multer');
const express = require('express');
require('dotenv').config();
const swagger = require('swagger-ui-express');
const routes = require('./routes'); // Esta línea está correcta
const { sequelize } = require('./db/models/index');
const cors = require('cors');  // Asegúrate de agregar esta línea
dotenv.config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto con tu URL de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.on('error', (err) => {
    console.log('Server error: ', err);
});


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB();




app.use('/api', routes);

app.use('/api-docs', swagger.serve, swagger.setup(require('./swagger.json')));

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server started on port ${process.env.PORT || 3001}`);
});