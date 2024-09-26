import { Module } from '@nestjs/common';
import { RetosService } from './retos.service';
import { RetosController } from './retos.controller';

@Module({
  controllers: [RetosController],
  providers: [RetosService],
})
export class RetosModule {}
