import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly unitType: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly capacity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly kbxlEquipmentNumber: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly carrierId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isEnabled: boolean;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly docs: FileList[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly operatorsIds: number[];
}

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {}

export class FilterEquipmentDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
