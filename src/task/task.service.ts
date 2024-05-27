import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}
	async getById(id: string) {
		const data = await this.prisma.testTask.findUnique({
			where: {
				id: +id
			}
		});
		if (!data) throw new NotFoundException(`Task ${id} not found`);
		return data;
	}
	async getAll() {
		const data = await this.prisma.testTask.findMany();
		return [{ message: 'Get', data }];
	}
	async create(dto: TaskDto) {
		const data = await this.prisma.testTask.create({
			data: {
				name: dto.name,
				age: dto.age
			}
		});
		return [{ message: 'Create', data }];
	}
	async update(id: string, dto: TaskDto) {
		await this.getById(id);

		const data = await this.prisma.testTask.update({
			where: {
				id: +id
			},
			data: {
				name: dto.name,
				age: dto.age,
				isDone: true
			}
		});
		return [{ message: 'Update', data }];
	}
	async delete(id: string) {
		await this.getById(id);

		const data = await this.prisma.testTask.delete({
			where: {
				id: +id
			}
		});
		return [{ message: 'Delete', data }];
	}
}
