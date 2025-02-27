/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
export class CreatePokemonDto {
  @IsInt()
  @IsNumber()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
