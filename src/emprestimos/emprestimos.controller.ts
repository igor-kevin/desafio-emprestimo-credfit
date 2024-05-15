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
  create(@Body() createEmprestimoDto: CreateEmprestimoDto, funcionario: Repository<Funcionario>) {
    return this.emprestimosService.create(createEmprestimoDto, funcionario);
  }

  @Get()
  findAll() {
    return this.emprestimosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emprestimosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmprestimoDto: UpdateEmprestimoDto) {
    return this.emprestimosService.update(+id, updateEmprestimoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emprestimosService.remove(+id);
  }
}
