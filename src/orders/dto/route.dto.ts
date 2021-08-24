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
  readonly deliveryCustomerName: string;

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
  readonly kilometers: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly warehouseLoadTime: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly timeToDeliver: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly customerTimesDischarge: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly totalHours: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly totalDays: number;
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
