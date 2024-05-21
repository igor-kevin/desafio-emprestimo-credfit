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
    const { representante_cnpj, representante_razao_social } = createRepresentanteDto;

    const representanteExists = await this.representanteRepository.findOne({
      where: [{ representante_cnpj: representante_cnpj }, { representante_nome_social: representante_razao_social }]
    });

    if (representanteExists) {
      throw new ConflictException('Já existe um representante com esses dados.');
    }

    const novoRepresentante = this.representanteRepository.create(createRepresentanteDto);
    return await this.representanteRepository.save(novoRepresentante);
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

    try {
      const novoRepresentante = this.representanteRepository.create({ ...representante, ...updateRepresentanteDto });
      return await this.representanteRepository.save(novoRepresentante);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Já existe um representante com algum desses dados que eram para ser unique.');
      } else {
        throw error;
      }
    }
  }

  async remove(id: number): Promise<void> {
    const representante = await this.representanteRepository.findOne({ where: { representante_id: id } });
    if (!representante) {
      throw new NotFoundException(`Representante com ID ${id} não encontrado`);
    }
    await this.representanteRepository.remove(representante);
  }
}
