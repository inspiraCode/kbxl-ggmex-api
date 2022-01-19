import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly scac: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly caat: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly gpsProvider: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly hireDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isEnabled: boolean;

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
  page: number;
}
