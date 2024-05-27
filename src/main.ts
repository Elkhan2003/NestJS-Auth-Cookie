import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as session from 'express-session';
import * as passport from 'passport';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			'http://localhost:3000',
			'http://localhost:5173',
			'https://crudnest.vercel.app'
		],
		credentials: true
	});
	const PORT: any = process.env.PORT || 3000;
	app.setGlobalPrefix('/api/v1');
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	app.set('trust proxy', 1);
	process.env.NODE_ENV === 'development'
		? app.use(
				session({
					secret: 'Elcho911∑å∂®∆√˜∆´ß∫¬∆å´ƒø˙¥ª•¶™£ƒ˙ˆ∆å∫˚¬®√',
					saveUninitialized: false,
					resave: false,
					cookie: {
						sameSite: 'lax',
						secure: false,
						maxAge: 1000 * 60 * 60 * 24 * 7
					},
					store: new PrismaSessionStore(new PrismaClient(), {
						checkPeriod: 2 * 60 * 1000,
						dbRecordIdIsSessionId: true,
						dbRecordIdFunction: undefined
					})
				})
			)
		: app.use(
				session({
					secret: 'Elcho911∑å∂®∆√˜∆´ß∫¬∆å´ƒø˙¥ª•¶™£ƒ˙ˆ∆å∫˚¬®√',
					saveUninitialized: false,
					resave: false,
					cookie: {
						sameSite: 'none',
						secure: true,
						maxAge: 1000 * 60 * 60 * 24 * 7
					},
					store: new PrismaSessionStore(new PrismaClient(), {
						checkPeriod: 2 * 60 * 1000,
						dbRecordIdIsSessionId: true,
						dbRecordIdFunction: undefined
					})
				})
			);
	app.use(passport.initialize());
	app.use(passport.session());
	try {
		await app.listen(PORT, '0.0.0.0');
		console.log(`${new Date()}`);
		console.log('server running at: http://localhost:' + PORT);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
bootstrap();
