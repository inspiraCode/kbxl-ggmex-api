import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly OrderNumber: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  readonly orderDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly hederComments: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
