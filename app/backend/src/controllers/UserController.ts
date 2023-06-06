import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../services/UserService';
import { tokenGenerate } from '../auth/authFucntions';

class UserController {
  public static async findUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const users = await UserService.findUser({ email, password });

    if (!users) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, users.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = tokenGenerate({ email, password });
    return res.status(200).json({ token });
  }

  public static async findRole(req: Request, res: Response) {
    const { user } = req.body;
    const { email } = user;
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const role = await UserService.findRole(email);
    return res.status(200).json({ role });
  }
}

export default UserController;
