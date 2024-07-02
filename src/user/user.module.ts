import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey@prash',
      signOptions: { algorithm: 'HS512', expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class UserModule {}
