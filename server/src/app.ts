import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';

import userRouter from './routes/user';
import passportConfig from './passport';

dotenv.config();

const prod = process.env.NODE_ENV === 'production';

const data = {
  userid: 'hj',
  passwd: '123'
};

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.json({ userid: 't1' });
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/login'
  })
);

app.post('/test', (req, res) => {
  console.log(req.session);
  res.send('ok');
});

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sos_test',
  debug: false
});

pool.on('connection', conn => {
  console.log('pool conncetion');
});

pool.on('acquire', conn => {
  console.log(`Connection ${conn.threadId} acquired`);
});

pool.on('release', conn => {
  console.log(`Conncetion ${conn.threadId} relaese`);
});

/*
const app = express();

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<h1>Hello Next</h1>');
});

app.use('/user', userRouter);

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'sos_test',
  debug: false
});

pool.on('connection', conn => {
  console.log('pool conncetion');
});

pool.on('acquire', conn => {
  console.log(`Connection ${conn.threadId} acquired`);
});

pool.on('release', conn => {
  console.log(`Conncetion ${conn.threadId} relaese`);
});

*/

export default app;
