import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';

import userRouter from './routes/user';
import passportConfig from './passport';
import morgan = require('morgan');

dotenv.config();

const prod = process.env.NODE_ENV === 'production';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(morgan('dev'));
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

export default app;
