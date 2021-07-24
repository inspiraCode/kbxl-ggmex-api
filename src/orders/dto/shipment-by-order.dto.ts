import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateShipmentByOrder {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly shipmentNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly customerName: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly appointmentDate: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly deliveryDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly weight: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly truckType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly sRcomments: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly headerComments: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly cancelationReazon: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly carrierId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly routeId: number;
}

export class UpdateShipmentByOrderDto extends PartialType(
  CreateShipmentByOrder,
) {}

export class FilterShipmentByOrderDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
