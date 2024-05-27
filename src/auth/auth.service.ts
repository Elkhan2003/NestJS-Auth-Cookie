import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from '../database/prisma.service';
import { Profile } from 'passport-google-oauth20';
import * as moment from 'moment';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async validateUser(profile: Profile) {
		try {
			const profileData = await this.prisma.user.findUnique({
				where: {
					login: profile._json.email
				}
			});
			if (!profileData) {
				return await this.prisma.user.create({
					data: {
						auth: 'Google',
						firstName: profile._json.given_name || '',
						lastName: profile._json.family_name || '',
						login: profile._json.email || '',
						password: '',
						photo: profile._json.picture || '',
						createdAt: moment().utcOffset(6).format('YYYY-MM-DD HH:mm:ss Z'),
						updatedAt: moment().utcOffset(6).format('YYYY-MM-DD HH:mm:ss Z')
					}
				});
			} else {
				return profileData;
			}
		} catch (err) {
			console.log(`${err}`);
		}
	}

	async findUser(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id: id
			}
		});
	}

	handleLogin() {
		return { message: 'Google Authentication' };
	}

	handleLogout(req: Request, res: Response) {
		req.logout(function (err) {
			if (err) {
				return 'Error';
			}
			return res.redirect(
				process.env.NODE_ENV === 'development'
					? process.env.FRONTEND_BASE_URL_DEV!
					: process.env.FRONTEND_BASE_URL_PROD!
			);
		});
	}

	redirect(res: Response) {
		return res.redirect(
			process.env.BACKEND_TEST_MODE === 'active'
				? process.env.NODE_ENV === 'development'
					? `${process.env.FRONTEND_BASE_URL_DEV}/api/v1/auth/status`
					: `${process.env.FRONTEND_BASE_URL_PROD}/api/v1/auth/status`
				: process.env.NODE_ENV === 'development'
					? `${process.env.FRONTEND_BASE_URL_DEV}/`
					: `${process.env.FRONTEND_BASE_URL_PROD}/`
		);
	}

	user(req: Request) {
		if (req.user) {
			return { success: true, user: req.user };
		} else {
			return { success: false, user: null };
		}
	}

	userStatus(req: Request) {
		if (req.user) {
			return { message: 'Authenticated', user: req.user };
		} else {
			return { message: 'Not Authenticated' };
		}
	}
}
