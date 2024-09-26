import { Module } from '@nestjs/common';
import { RetosModule } from './retos/retos.module';

@Module({
  imports: [RetosModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
