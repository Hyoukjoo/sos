import next from 'next';
import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import { config } from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

config();

app
  .prepare()
  .then(() => {
    const server = express();
    // server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(
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

    server.get('/user/:id', (req, res) => {
      return app.render(req, res, '/user', { id: req.params.id });
    });

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.listen(process.env.SERVER_PORT, () => {
      console.log('client server is running!');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
