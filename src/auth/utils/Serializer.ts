/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	constructor(
		@Inject('AUTH_SERVICE') private readonly authService: AuthService
	) {
		super();
	}

	serializeUser(user: User, done: Function) {
		// console.log('Serializer User', user);
		return done(null, user);
	}

	async deserializeUser(payload: any, done: Function) {
		const user = await this.authService.findUser(payload.id);
		// console.log('Deserialize User', user);
		return user ? done(null, user) : done(null, null);
	}
}
