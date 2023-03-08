import express from 'express';
import { AuthService } from '../services/auth.service';

const router = express.Router();
const authService = new AuthService();

router.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;
  const token = await authService.signup(name, username, password);
  if(token) {
    res.json({ token });
  } else {
    res.status(401).send('Username already taken. Please try another username!');
  }
});

router.post('/signon', async (req, res) => {
  const { username, password } = req.body;
  const token = await authService.signon(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

export { router as authRouter };
