import express from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { UserService } from '../services/user.service';

const router = express.Router();
const userService = new UserService();

router.get('/', authenticateToken, async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

router.get('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/', async (req, res) => {
  const { name, username, password } = req.body;
  const user = await userService.createUser(name, username, password);
  res.json(user);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const { name, username } = req.body;
  const updatedUser = await userService.updateUser(id, name, username);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const id = req.params.id;
  const deletedUser = await userService.deleteUser(id);
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
});

export { router as userRouter };