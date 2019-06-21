"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const passport_local_1 = require("passport-local");
const bcrypt_1 = require("bcrypt");
const app_1 = require("../app");
const checkPoolConnection_1 = require("../utils/checkPoolConnection");
const promiseQuery_1 = require("../utils/promiseQuery");
const local = () => {
    passport_1.use(new passport_local_1.Strategy({
        usernameField: 'userid',
        passwordField: 'password'
    }, async (userid, password, done) => {
        try {
            app_1.pool.getConnection(async (err, conn) => {
                checkPoolConnection_1.checkPoolConnection(err, conn);
                const sql = 'select * from users where ?';
                const user_id = { userid };
                const user = await promiseQuery_1.promiseSelectOne(app_1.pool, sql, user_id);
                if (!user) {
                    return done(null, false, { message: 'Unknown User' });
                }
                const result = await bcrypt_1.compare(password, user[0].password);
                if (result) {
                    console.log('login success~');
                    return done(null, user[0]);
                }
                return done(null, false, { message: 'Incorreced Password' });
            });
        }
        catch (e) {
            console.log(e);
            return done(e);
        }
    }));
};
exports.default = local;
