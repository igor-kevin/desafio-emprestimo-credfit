import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Repository } from 'typeorm';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService
  ) { }

  @Post()
  create(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimosService.create(createEmprestimoDto);
  }


  @Get('/funcionario/:id')
  findEmprestimosPorFuncionario(@Param('id') id: number) {
    return this.emprestimosService.findEmprestimosPorFuncionario(id);
  }


}
