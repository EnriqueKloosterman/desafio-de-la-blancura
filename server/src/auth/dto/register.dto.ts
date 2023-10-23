import { Transform } from 'class-transformer';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  user_name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;
}
