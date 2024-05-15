import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly emprestimoRepository: Repository<Emprestimo>
  ) { }


  create(createEmprestimoDto: CreateEmprestimoDto) {
    return 'This action adds a new emprestimo';
  }

  findAll() {
    return `This action returns all emprestimos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprestimo`;
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
