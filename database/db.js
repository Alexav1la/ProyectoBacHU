require('dotenv').config();
const sql = require('mssql');
const { DeviceCodeCredential } = require('@azure/identity');

async function conectar() {
  const credential = new DeviceCodeCredential();
  const { token } = await credential.getToken('https://database.windows.net/.default');

  return new sql.ConnectionPool({
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    authentication: {
      type: 'azure-active-directory-access-token',
      options: { token }
    },
    options: { encrypt: true }
  }).connect();
}

const poolPromise = conectar();

module.exports = { sql, poolPromise };