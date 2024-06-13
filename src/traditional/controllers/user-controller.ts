import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
import logging from '../../config/logging';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      logging.error(error)
      res.status(500).send({ message: error });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserByEmail(req.body.email);
      if (!user) {
        logging.warn('User not found')
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  }
}
