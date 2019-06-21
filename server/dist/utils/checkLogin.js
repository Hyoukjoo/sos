"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send('Need Login');
    }
};
exports.default = isLogin;
