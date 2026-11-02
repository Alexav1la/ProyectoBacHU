const { poolPromise } = require('./database/db');

(async () => {
  const pool = await poolPromise;
  const r = await pool.request().query('SELECT COUNT(*) AS reglas FROM ReglaEvaluacion');
  console.log(r.recordset);
  process.exit();
})();