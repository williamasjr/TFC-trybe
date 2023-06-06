import { Request, Response, NextFunction } from 'express';

async function LoginValidateRegex(req:Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return next();
}

export default LoginValidateRegex;
