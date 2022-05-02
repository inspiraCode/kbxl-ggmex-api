import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
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

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly tripType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly deliveryCustomerName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly razonSocial: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly rfc: string;

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

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly zipCode: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly kilometers: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly comments: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly priorityFlag: boolean;

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

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isEnabled: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isDeleted: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly createdBy: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly updatedBy: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly deletedBy: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly caballete28Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls28Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly caballete30Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls30Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly caballete32Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls32Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly lowBoy24Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls24Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly lowBed32Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tollsLowBed32Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly lowBed28Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tollsLowBed28Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly torton16Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls16Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly torton18Ton: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly tolls18Ton: number;
}

export class UpdateRouteDto extends PartialType(CreateRouteDto) {}

export class FilterRouteDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
