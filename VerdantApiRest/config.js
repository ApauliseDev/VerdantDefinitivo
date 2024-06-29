require('dotenv').config();

module.exports = {
  database: process.env.DEV_DB_NAME,
  username: process.env.DEV_DB_USERNAME,
  password: process.env.DEV_DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true, // si estás utilizando conexiones encriptadas
      enableArithAbort: true // para evitar ciertos errores de SQL Server
    }
  }
};
