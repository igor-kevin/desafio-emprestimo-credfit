import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRepresentanteDto } from './dto/create-representante.dto';
import { UpdateRepresentanteDto } from './dto/update-representante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Representante } from './entities/representante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepresentantesService {
  constructor(
    @InjectRepository(Representante)
    private readonly representanteRepository: Repository<Representante>,
  ) { }

  create(createRepresentanteDto: CreateRepresentanteDto) {
    return this.representanteRepository.create(createRepresentanteDto);
  }

  async findAll(): Promise<Representante[]> {
    return await this.representanteRepository.find();
  }

  findOne(id: number): Promise<Representante> {
    const representante = this.representanteRepository.findOne({ where: { representante_id: id } });
    if (!representante) {
      throw new NotFoundException(`Não achou o representante de id #${id}`);
    }
    return representante;
  }

  async update(id: number, updateRepresentanteDto: UpdateRepresentanteDto): Promise<Representante> {
    const representante = await this.representanteRepository.findOne({ where: { representante_id: id } });
    if (!representante) {
      throw new NotFoundException(`Não achou o representante de id #${id}`);
    }
    return this.representanteRepository.create({ ...representante, ...updateRepresentanteDto });
  }

  async remove(id: number) {
    const representante = await this.representanteRepository.findOne({ where: { representante_id: id } })
  }
}
