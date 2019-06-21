"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = require("passport");
const bcrypt_1 = require("bcrypt");
const app_1 = require("../app");
const checkPoolConnection_1 = require("../utils/checkPoolConnection");
const promiseQuery_1 = require("../utils/promiseQuery");
const router = express_1.Router();
router.post('/signup', async (req, res, next) => {
    try {
        const sql = 'select * from users where ?';
        const userid = { userid: req.body.userid };
        const exUser = await promiseQuery_1.promiseSelectOne(app_1.pool, sql, userid);
        if (exUser.length > 0) {
            console.log('current userid');
            return res.status(401).send('It is current user');
        }
        const password_hash = await bcrypt_1.hash(req.body.password, 11);
        const signupInfo = [req.body.userid, password_hash];
        app_1.pool.getConnection((err, conn) => {
            checkPoolConnection_1.checkPoolConnection(err, conn);
            conn.query('insert into users (userid, password) values (?, ?)', signupInfo, () => conn.release());
        });
        res.end();
    }
    catch (e) {
        console.log(e);
        return next(e);
    }
});
router.post('/login', (req, res, next) => {
    passport_1.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info);
        }
        return req.login(user, loginErr => {
            //assign user data into req.user
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    })(req, res, next);
});
exports.default = router;
