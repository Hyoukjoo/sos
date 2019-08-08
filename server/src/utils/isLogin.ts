import { Request, Response, NextFunction } from 'express';

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Need Login');
  }
};

export default isLogin;
