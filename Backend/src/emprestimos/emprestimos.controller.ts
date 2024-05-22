import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';


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
