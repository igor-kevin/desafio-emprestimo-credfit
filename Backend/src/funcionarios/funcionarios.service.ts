import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>
  ) { }

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const novoFuncinoario = this.funcionarioRepository.create(createFuncionarioDto)

    try {
      return await this.funcionarioRepository.save(novoFuncinoario);
    } catch (error) {
      // 23505 é o erro do postgre
      if (error.code === '23505') {
        throw new ConflictException('Já existe um representante com algum esses dados que eram para ser unique.');
      } else {
        throw error;
      }
    }
  }



  findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  async findOne(id: number): Promise<Funcionario> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: id } })
    if (!funcionario) {
      throw new NotFoundException(`Não foi possível acessar o funcionario de id ${id}`)
    }
    return funcionario;
  }

  async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    const funcionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: id } })
    if (!funcionario) {
      throw new NotFoundException(`Não foi possível acessar o funcionario de id ${id}`)
    }
    return this.funcionarioRepository.create({ ...funcionario, ...updateFuncionarioDto })
  }

  async remove(id: number): Promise<void> {
    const funcionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: id } })
    if (!funcionario) {
      throw new NotFoundException(`Não foi possível acessar o funcionario de id ${id}`)
    }
    await this.funcionarioRepository.delete(funcionario)
  }
}
