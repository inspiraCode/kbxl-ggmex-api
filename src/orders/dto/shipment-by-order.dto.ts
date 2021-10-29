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
  @IsDate()
  @ApiProperty()
  readonly appointmentDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly shipmentNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly customerName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly state: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly deliveryTerms: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly ligisticsAgent: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly srFreight: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly orderFreight: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly truckType: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly deliveryDate: Date;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly transportStatus: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly orderStatus: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly financialStatus: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly weight: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly TSM: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly srHeaderComments: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly orderHeaderComment: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty()
  // readonly status: string;

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

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly equipmentId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly equipmentPlataform1Id: number;
}

export class UpdateShipmentByOrderDto extends PartialType(
  CreateShipmentByOrder,
) {}

export class CreateShipmentsByOrder {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;
}

export class FilterShipmentByOrderDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
