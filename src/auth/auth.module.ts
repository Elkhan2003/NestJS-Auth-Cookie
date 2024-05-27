import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
	imports: [DatabaseModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		GoogleStrategy,
		SessionSerializer,
		{
			provide: 'AUTH_SERVICE',
			useClass: AuthService
		}
	]
})
export class AuthModule {}
