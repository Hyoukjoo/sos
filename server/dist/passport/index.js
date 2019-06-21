"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const local_1 = __importDefault(require("./local"));
const rootPassport = () => {
    passport_1.serializeUser((user, done) => {
        done(null, user.userid);
    });
    passport_1.deserializeUser((user, done) => {
        console.log('deserialize');
        console.log(user);
        done(null, user);
    });
    local_1.default();
};
exports.default = rootPassport;
