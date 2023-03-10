import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateAvailableDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly availableDateCommmit: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly availableComments: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly availableStatus: boolean;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly carrierId: number;
}

export class UpdateAvailableDto extends PartialType(CreateAvailableDto) {}

export class CurrentDateParams {
  @IsString()
  startDate: string;
  @IsString()
  endDate: string;
}

export class FilterAvailableDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
