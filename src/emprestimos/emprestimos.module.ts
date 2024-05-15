import { Module } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service';
import { EmprestimosController } from './emprestimos.controller';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { RepresentantesModule } from 'src/representantes/representantes.module';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo, Funcionario,]), RepresentantesModule],
  controllers: [EmprestimosController],
  providers: [EmprestimosService, LogicaEmprestimoService, FuncionariosService],
})
export class EmprestimosModule { }
