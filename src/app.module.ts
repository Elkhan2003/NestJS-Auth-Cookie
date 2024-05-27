import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { CrudModule } from './crud/crud.module';

@Module({
	imports: [
		TaskModule,
		AuthModule,
		PassportModule.register({ session: true }),
		CrudModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
