import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly routeNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly country: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly timeDischargeAndReturn: number;
}

export class UpdateRouteDto extends PartialType(CreateRouteDto) {}

export class FilterRouteDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
