import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkHashPassword } from 'src/common/helpers';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    pass: string,
    // eslint-disable-next-line prettier/prettier
  ): Promise<{ id: string; login: string } | null> {
    console.log('Login: ', login, 'Passw:', pass);

    const user = await this.usersService.findOne(login);
    if (!user) return null;
    const { password: hashPassword } = user;
    const comparisonRes = await checkHashPassword(pass, hashPassword);
    if (comparisonRes) {
      const { password, ...result } = user;
      return result;
    }
    // if (user && user.password === pass) {
    //  const { password, ...result } = user;
    //  return result;
    //}
    return null;
  }

  async login(login: string, id: string) {
    const payload = { login, id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
