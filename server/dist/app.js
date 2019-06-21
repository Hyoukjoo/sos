"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("./routes/user"));
const passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config();
const prod = process.env.NODE_ENV === 'production';
const app = express_1.default();
passport_2.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
app.use(express_session_1.default({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: prod
    },
    name: 'HJ'
}));
app.use(cors_1.default({
    origin: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/user', user_1.default);
exports.pool = mysql_1.default.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'sos_test',
    debug: false
});
exports.pool.on('connection', conn => {
    console.log('pool conncetion');
});
exports.pool.on('acquire', conn => {
    console.log(`Connection ${conn.threadId} acquired`);
});
exports.pool.on('release', conn => {
    console.log(`Conncetion ${conn.threadId} relaese`);
});
exports.default = app;
