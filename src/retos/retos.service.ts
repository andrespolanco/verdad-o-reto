import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRetoDto } from './dto/create-reto.dto';
import { UpdateRetoDto } from './dto/update-reto.dto';
import { v4 as uuid } from 'uuid';
import { Reto } from './entities/reto.entity';

@Injectable()
export class RetosService {
  private retos: Reto[] = [
    {
      id: uuid(),
      description: 'QUÉDATE EN ROPA INTERIOR POR EL RESTO DEL JUEGO',
      createdAt: new Date().getTime(),
    },
    {
      id: uuid(),
      description: 'DAME 5 NOMBRES DE POSICIONES SEXUALES',
      createdAt: new Date().getTime(),
    },
  ];

  create(createRetoDto: CreateRetoDto) {
    const { description } = createRetoDto;
    const reto: Reto = {
      id: uuid(),
      description: description.toLowerCase(),
      createdAt: new Date().getTime(),
    };
    this.retos.push(reto);
    return reto;
  }

  findAll() {
    return this.retos;
  }

  findOne(id: string) {
    const reto = this.retos.find((reto) => reto.id === id);
    if (!reto) throw new NotFoundException(`Reto with id ${id} not found`);
    return reto;
  }

  update(id: string, updateRetoDto: UpdateRetoDto) {
    let retoDB = this.findOne(id);
    this.retos = this.retos.map((reto) => {
      if (reto.id === id) {
        retoDB.updatedAt = new Date().getTime();
        retoDB = {
          ...retoDB,
          ...updateRetoDto,
        };
        return retoDB;
      }
      return reto;
    });
    return retoDB;
  }

  remove(id: string) {
    this.retos = this.retos.filter((reto) => reto.id !== id);
  }
}
