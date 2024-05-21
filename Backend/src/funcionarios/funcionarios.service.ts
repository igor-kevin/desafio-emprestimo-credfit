import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';
import { Representante } from 'src/representantes/entities/representante.entity';



@Injectable()
export class FuncionariosService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,

    @InjectRepository(Representante)
    private readonly representanteRepository: Repository<Representante>
  ) { }

  async create(createFuncionarioDto: CreateFuncionarioDto): Promise<Funcionario> {

    const { representante_id, ...funcionarioData } = createFuncionarioDto;
    const existeRepresentante = await this.representanteRepository.findOne({ where: { representante_id } })
    if (!existeRepresentante) {
      throw new NotFoundException(`Não encontrei o representante com id:${representante_id}`);
    }
    const novoFuncionario = this.funcionarioRepository.create({
      ...funcionarioData,
      empresa: existeRepresentante,
    })

    try {
      return await this.funcionarioRepository.save(novoFuncionario);
    } catch (error) {
      // 23505 é o erro do postgre
      if (error.code === '23505') {
        throw new ConflictException('Já existe um representante com algum esses dados que eram para ser unique.');
      } else {
        throw error;
      }
    }
  }


  async getEmpresaDoFuncionario(funcionario: Funcionario): Promise<number> {
    try {
      const existeRepresentante = await this.representanteRepository.findOne({ where: { representante_id: funcionario.empresa.representante_id } });


      if (!existeRepresentante) {
        throw new NotFoundException(`Não encontrei o representante com id:${funcionario.empresa.representante_id}`);
      }
      return existeRepresentante.representante_id;
    }
    catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro na busca da empresa do funcionario.')
    }
  }

  async getEmpresa(representante_id): Promise<number> {
    try {
      const representante = await this.representanteRepository.findOne({ where: { representante_id: representante_id } })
      if (!representante) {
        throw new NotFoundException(`Não encontrei o representante com id:${representante_id}`);
      }
      return representante.representante_id;
    }
    catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro na busca da empresa do funcionario.')
    }
  }

  findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find();
  }

  async findOne(id: number): Promise<Funcionario> {
    const existeFuncionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: id }, relations: ["empresa"] });


    if (!existeFuncionario) {
      throw new NotFoundException(`Não foi possível acessar o funcionario de id ${id}`)
    }

    return existeFuncionario;
  }



}
