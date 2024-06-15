import { IPasswordHasher } from "../../application/providers/ipasswordHasher";
import * as bcrypt from 'bcrypt-ts';

export class PasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}