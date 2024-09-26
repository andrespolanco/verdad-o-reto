// import { PartialType } from '@nestjs/mapped-types';
// import { CreateRetoDto } from './create-reto.dto';
//
// export class UpdateRetoDto extends PartialType(CreateRetoDto) {}

import { IsString, MinLength } from 'class-validator';

export class UpdateRetoDto {
  @IsString()
  @MinLength(1)
  description: string;
}
