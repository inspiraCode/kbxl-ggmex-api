import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import config from '../config';
import { ConfigType } from '@nestjs/config';

import { UserModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalEstrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt_secret,
          signOptions: {
            expiresIn: '30m',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalEstrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
