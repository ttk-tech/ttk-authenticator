import { UserRepository } from '../repositories/user-repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: { name: string; email: string; password: string }) {
    return await this.userRepository.createUser(userData);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
