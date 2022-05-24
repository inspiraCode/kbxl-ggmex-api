import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateMaterialByShipmentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly claveSAT: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly descripcionSAT: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly HTS: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly pedimento: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly paquetes: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly laminas: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly pesoNeto: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly pesoBruto: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly shipmentByOrderId: number;
}
export class UpdateMaterialByShipmentDto extends PartialType(
  CreateMaterialByShipmentDto,
) {}

export class FilterMaterialByShipmentDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
