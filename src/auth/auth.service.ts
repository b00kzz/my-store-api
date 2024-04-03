import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';


const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserConnect(uuid: string) {
    const userConnect = await this.userService.findOneByUuid(uuid);
    if (userConnect) {
      const payload = {
        username: userConnect.username,
        sub: {
          userId: userConnect.id,
          name: userConnect.nickName,
        },
      };
      const { password, ...result } = userConnect;
      // const { createdAt, updatedAt, deletedAt, ...result } = userConnect;
      const data = {
        statusCode: 200, data: {
          // ...user, uuid: result.uuid,
          ...result,
          accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
          refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        }
      }
      return data
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: {
        userId: user.id,
        name: user.username,
      },
    };

    const data = {
      ...user,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }

    return {
      statusCode: 200,
      data
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        userId: user.id,
        name: user.username,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

}
