import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import morgan from 'morgan';
import path from 'path';

import userRouter from './routes/user';
import postRouter from './routes/post';
import groupRouter from './routes/group';
import followRouter from './routes/follow';
import profileRouter from './routes/profile';

import passportConfig from './passport';
import { sequelize } from './models';

dotenv.config();

const prod = process.env.NODE_ENV === 'production';

const app = express();

sequelize.sync();

app.use('/static/images', express.static(path.join(__dirname, 'static', 'images')));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

if (prod) app.use(morgan('combined'));
else app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
app.use('/post', postRouter);
app.use('/group', groupRouter);
app.use('/follow', followRouter);
app.use('/profile', profileRouter);

export default app;
