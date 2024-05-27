import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	getTasks() {
		return this.taskService.getAll();
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createTask(@Body() dto: TaskDto) {
		return this.taskService.create(dto);
	}

	@Patch(':id')
	updateTask(@Param('id') id: string, @Body() dto: TaskDto) {
		return this.taskService.update(id, dto);
	}

	@Delete(':id')
	deleteTask(@Param('id') id: string) {
		return this.taskService.delete(id);
	}
}
