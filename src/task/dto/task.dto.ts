import { IsInt, IsString } from 'class-validator';

export class TaskDto {
	@IsString()
	name: string;
	@IsInt()
	age: number;
}
