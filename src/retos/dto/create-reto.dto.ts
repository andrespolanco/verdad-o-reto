import { IsString, MinLength } from 'class-validator';

export class CreateRetoDto {
  @IsString()
  @MinLength(1)
  description: string;
}
