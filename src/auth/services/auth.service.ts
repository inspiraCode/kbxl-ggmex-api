import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(userName: string, password: string) {
    // const user = await this.usersService.findByEmail(email);
    const user = await this.usersService.findByUsername(userName);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    return null;
  }
}
