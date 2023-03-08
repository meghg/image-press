import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';

export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'jwtsecret';

  async signup(name: string, username: string, password: string): Promise<string | null> {

    const existingUser = await UserModel.findOne({ username });

    if(existingUser) return null;

    password = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, username, password });
    await user.save();

    const token = this.generateToken(user);
    return token;
  }

  async signon(username: string, password: string): Promise<string | null> {
    const user = await UserModel.findOne({ username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = this.generateToken(user);
        return token;
      }
    }
    return null;
  }

  private generateToken(user: User): string {
    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '1h' });
    return token;
  }
}