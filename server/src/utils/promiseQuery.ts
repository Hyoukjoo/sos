import { Pool, MysqlError, PoolConnection } from 'mysql';
import { checkPoolConnection } from './checkPoolConnection';

export const promiseSelectOne = (pool: Pool, sql: string, args: any) => {
  return new Promise<any>((resolve, reject) => {
    pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      checkPoolConnection(err, conn);
      conn.query(sql, args, (err, rows) => {
        conn.release();
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  });
};
