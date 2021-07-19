import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCarrierDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly legalName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly comertialName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly hireDate: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly docs: FileList[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly operatorsId: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly equipmetsId: number[];
}

export class UpdateCarrierDto extends PartialType(CreateCarrierDto) {}

export class FilterCarrierDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
