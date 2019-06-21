"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkPoolConnection_1 = require("./checkPoolConnection");
exports.queryAndRelease = (conn, err, sql, args, cb) => {
    checkPoolConnection_1.checkPoolConnection(err, conn);
    conn.query(sql, args, (err, rows) => {
        conn.release();
    });
};
exports.promiseSelectOne = (pool, sql, args) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            checkPoolConnection_1.checkPoolConnection(err, conn);
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
