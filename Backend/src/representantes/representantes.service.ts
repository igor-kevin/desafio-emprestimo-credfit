import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createRepresentanteDto: CreateRepresentanteDto) {
    const novoRepresentante = this.representanteRepository.create(createRepresentanteDto);

    try {
      return await this.representanteRepository.save(novoRepresentante);
    } catch (error) {
      // 23505 é o erro do postgre
      if (error.code === '23505') {
        throw new ConflictException('Já existe um representante com algum esses dados que eram para ser unique.');
      } else {
        throw error;
      }
    }
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
    // O teste catch não ta levantando nenhum erro, mas ele também não atualiza o dado caso seja igual.
    try {
      return this.representanteRepository.create({ ...representante, ...updateRepresentanteDto });
    } catch (error) {
      // 23505 é o erro do postgre
      if (error.code === '23505') {
        throw new ConflictException('Já existe um representante com algum esses dados que eram para ser unique.');
      } else {
        throw error;
      }
    }
  }

  async remove(id: number) {
    const representante = await this.representanteRepository.findOne({ where: { representante_id: id } })
  }
}
