import { BadGatewayException, Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards, UsePipes, ValidationPipe  } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
// import { User } from "src/users/entities/user.entity";
import { AuthGuard } from "./guard/auth.guard";
import { Response } from "express";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    
    @Post('register')
    @UsePipes(new ValidationPipe({ transform: true})) //
    async register(@Body() registerDto: RegisterDto, @Res() res: Response): Promise<any>{
        try {
            const  serviceResponse = await this.authService.register(registerDto);
            res.status(HttpStatus.CREATED).json(serviceResponse);
        } catch (error) {
            throw new BadGatewayException(error, `user creation faliled`)
        }
        // return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req){
        return req.user;
    }

    @Get('logout')
    @UseGuards(AuthGuard)
    async logout(@Request() request: Request, @Res() res: Response){
        try {
            res.clearCookie('token')
            res.status(HttpStatus.OK).json({message: 'logout successfull'});
        } catch (error) {
            res.status(HttpStatus.BAD_GATEWAY).json({message: 'logout failed'});
        }        
    }
}