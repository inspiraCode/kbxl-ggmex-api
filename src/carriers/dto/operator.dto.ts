import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
export class CreateOperatorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly operatorName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly docs: FileList[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly carrierId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly equipmentsIds: number[];
}

export class UpdateOperatorDto extends PartialType(CreateOperatorDto) {}

export class FilterOperatorDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
