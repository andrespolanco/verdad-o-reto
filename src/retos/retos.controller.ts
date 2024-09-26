import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RetosService } from './retos.service';
import { CreateRetoDto } from './dto/create-reto.dto';
import { UpdateRetoDto } from './dto/update-reto.dto';

@Controller('retos')
export class RetosController {
  constructor(private readonly retosService: RetosService) {}

  @Post()
  create(@Body() createRetoDto: CreateRetoDto) {
    return this.retosService.create(createRetoDto);
  }

  @Get()
  findAll() {
    return this.retosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.retosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRetoDto: UpdateRetoDto,
  ) {
    return this.retosService.update(id, updateRetoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.retosService.remove(id);
  }
}
