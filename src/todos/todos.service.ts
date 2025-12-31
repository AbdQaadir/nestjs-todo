import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create({
    userId,
    createTodoDto,
  }: {
    userId: string;
    createTodoDto: CreateTodoDto;
  }) {
    try {
      const payload = {
        title: createTodoDto.title,
        description: createTodoDto.description,
        completed: createTodoDto.completed,
        userId,
      };

      const newTodo = await this.databaseService.todo.create({
        data: payload,
      });

      return newTodo;
    } catch (error: any) {
      console.log({ error });
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll({ userId }: { userId: string }) {
    const todos = await this.databaseService.todo.findMany({
      where: {
        userId,
      },
    });

    return todos;
  }

  async findOne({ todoId, userId }: { todoId: string; userId: string }) {
    const matchingTodo = await this.databaseService.todo.findFirst({
      where: {
        id: todoId,
        userId,
      },
    });
    if (matchingTodo === null) {
      throw new NotFoundException();
    }

    return matchingTodo;
  }

  async update({
    userId,
    todoId,
    updateTodoDto,
  }: {
    userId: string;
    todoId: string;
    updateTodoDto: UpdateTodoDto;
  }) {
    const updatedTodo = await this.databaseService.todo.update({
      where: {
        id: todoId,
        userId,
      },
      data: updateTodoDto,
    });

    return updatedTodo;
  }

  async remove({ userId, todoId }: { userId: string; todoId: string }) {
    const deletedTodo = await this.databaseService.todo.delete({
      where: {
        id: todoId,
        userId,
      },
    });
    return deletedTodo;
  }
}
