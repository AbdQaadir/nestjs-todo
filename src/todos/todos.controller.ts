import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/common/clerk/clerk.guard';

import { UserId } from 'src/common/decorators/user.decorator';

@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@UserId() userId: string, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create({ userId, createTodoDto });
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.todosService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: string) {
    return this.todosService.findOne({ todoId: id, userId });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @UserId() userId: string,
  ) {
    return this.todosService.update({ todoId: id, userId, updateTodoDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: string) {
    return this.todosService.remove({ todoId: id, userId });
  }
}
