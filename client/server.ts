import next from 'next';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import morgan from 'morgan';
import { config } from 'dotenv';

config();

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    if (prod) server.use(morgan('combined'));
    else server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(
      expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET as string,
        cookie: {
          maxAge: 6000,
          httpOnly: true,
          secure: prod
        }
      })
    );

    server.get('/user/:id', (req, res) => {
      const { id } = req.params;

      return app.render(req, res, '/user', { id });
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(process.env.SERVER_PORT || 3000, () => {
      console.log('client server is running!');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
