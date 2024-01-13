import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash as argonHash } from 'argon2';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) throw new BadRequestException('This email already exist!');

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argonHash(createUserDto.password),
    });
    // return 'This action SHD adds a new user' + JSON.stringify(createUserDto);
    const token = await this.jwtService.sign({ email: createUserDto.email });

    return { user, token };
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // --------

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
