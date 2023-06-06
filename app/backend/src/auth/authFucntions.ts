import { verify, SignOptions, sign } from 'jsonwebtoken';

export interface token {
  id?: number,
  email: string,
  password: string,
}

const secret: string = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

const tokenGenerate = (payload: token) => {
  const token = sign(payload, secret, jwtConfig);
  return token;
};

const verifyToken = (token: string) => {
  try {
    const isValidToken = verify(token, secret, jwtConfig);
    return isValidToken;
  } catch (error) {
    return false;
  }
};

export { tokenGenerate, verifyToken };
