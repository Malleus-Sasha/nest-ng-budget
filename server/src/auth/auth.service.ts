import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './types/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await verify(user.password, pass);

    if (user && passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('User or password are incorrect!');
    return null;
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      access_token: this.jwtService.sign({ id, email }),
    };
  }
}
