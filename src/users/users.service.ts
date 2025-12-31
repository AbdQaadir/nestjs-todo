import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findOne(userId: string) {
    return await this.databaseService.user.findFirst({
      where: {
        userId: userId,
      },
    });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    return await this.databaseService.user.upsert({
      where: {
        userId: userId,
      },
      update: {
        name: name,
      },
      create: {
        userId,
        name,
        email: email as string,
      },
    });
  }

  async remove(userId: string) {
    return await this.databaseService.user.delete({
      where: {
        userId,
      },
    });
  }
}
