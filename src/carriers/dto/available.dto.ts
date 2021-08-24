import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
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

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly carrierId: number;
}

export class UpdateAvailableDto extends PartialType(CreateAvailableDto) {}

export class FilterAvailableDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
