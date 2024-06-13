import express from 'express';
import { UserController } from '../controllers/user-controller';

const router = express.Router();
const userController = new UserController();

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getUserByEmail(req, res));

export default router;
