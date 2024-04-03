import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {
  constructor(@Inject("USER_REPOSITORY") private userRepository: UserRepository) { }
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      return { statusCode: HttpStatus.CONFLICT, message: "Username already exists" };
    } else {
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    }
  }

  async findAll() {
    const [data, total] = await this.userRepository.findAndCount();
    if (total > 0) {
      return { data, total };
    }
    return { data: [], total: 0 }
  }

  async findOne(id: number) {
    const userConnect = await this.userRepository.findOne({ where: { id } });
    if (!userConnect) {
      return null
    }
    return userConnect;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      try {
        const update = Object.assign(user, updateUserDto);
        return await this.userRepository.save(update);
      } catch (error) {
        throw new NotFoundException({ massage: `User is already` });
      }
    } else {
      throw new NotFoundException({ massage: `User does not exit!!` });
    }
  }

  async remove(id: number) {
    const userConnect = await this.userRepository.findOneBy({ id });
    if (userConnect) {
      await this.userRepository.softDelete(id)
      return {
        success: true,
        message: "delete success",
        statusCode: 200,
      }
    }
    throw new NotFoundException();
  }

  async findOneWithUserName(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByUuid(uuid: string) {
    const userConnect = await this.userRepository.findOne({ where: { uuid } });
    if (!userConnect) {
      return null
    }
    return userConnect;
  }
}
