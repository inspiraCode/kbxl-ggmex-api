import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
export class CreatePmDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  evidence: FileList[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly comments: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly equipmentId: number;
}

export class UpdatePmDto extends PartialType(CreatePmDto) {}

export class FilterPmDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
