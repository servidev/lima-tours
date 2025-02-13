import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  async findOne(conditions: FindOptionsWhere<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: conditions,
    });

    if (!user) {
      throw new NotFoundException(
        `user with conditions ${JSON.stringify(conditions)} not found`,
      );
    }
    return user;
  }
}
