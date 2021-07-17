import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userName: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @ApiProperty({ required: false, default: true })
  readonly isEnabled?: boolean = true;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUsersDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
