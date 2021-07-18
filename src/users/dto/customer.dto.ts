import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly mainContact: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomersDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
