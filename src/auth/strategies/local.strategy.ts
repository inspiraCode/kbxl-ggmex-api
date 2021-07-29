import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalEstrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userName: string, password: string) {
    const user = await this.authService.validateUser(userName, password);

    if (!user) {
      throw new UnauthorizedException('Username or Password is incorrect');
    }
    return user;
  }
}
