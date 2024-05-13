import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';

@Injectable()
export class EmprestimosService {
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
