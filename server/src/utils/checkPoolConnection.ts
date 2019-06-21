import mysql from 'mysql';

export const checkPoolConnection = (err: mysql.MysqlError, conn: mysql.PoolConnection): void => {
  if (err) {
    if (conn) {
      conn.release();
      return;
    }
  }
};
