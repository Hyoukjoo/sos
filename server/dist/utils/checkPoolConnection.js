"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPoolConnection = (err, conn) => {
    if (err) {
        if (conn) {
            conn.release();
            return;
        }
    }
};
