import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateUnitAvailableDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly commitmentDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isAvailable: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly reason: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly reasonComments: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly availableId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly operatorId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly equipmentId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly equipmentPlataform1Id: number;
}

export class UpdateUnitAvailableDto extends PartialType(
  CreateUnitAvailableDto,
) {}

export class FilterUnitAvailableDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  page: number;
}
