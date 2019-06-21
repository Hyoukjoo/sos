import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sos_test',
  debug: false
});

pool.on('connection', () => {
  console.log('pool conncetion');
});

pool.on('acquire', conn => {
  console.log(`Connection ${conn.threadId} acquired`);
});

pool.on('release', conn => {
  console.log(`Conncetion ${conn.threadId} relaese`);
});

export default pool;
