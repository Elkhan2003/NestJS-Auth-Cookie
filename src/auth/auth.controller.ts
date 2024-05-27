import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Get('login/google')
	@UseGuards(GoogleAuthGuard)
	handleLogin() {
		return this.authService.handleLogin();
	}

	@Get('logout')
	handleLogout(@Req() req: Request, @Res() res: Response) {
		return this.authService.handleLogout(req, res);
	}

	@Get('callback/google')
	@UseGuards(GoogleAuthGuard)
	redirect(@Res() res: Response) {
		return this.authService.redirect(res);
	}

	@Get('user')
	user(@Req() req: Request) {
		return this.authService.user(req);
	}

	@Get('status')
	userStatus(@Req() req: Request) {
		return this.authService.userStatus(req);
	}
}
