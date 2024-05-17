import { Module } from '@nestjs/common';
import { RepresentantesService } from './representantes.service';
import { RepresentantesController } from './representantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emprestimo } from 'src/emprestimos/entities/emprestimo.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Representante } from './entities/representante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emprestimo, Funcionario, Representante]),],
  controllers: [RepresentantesController],
  providers: [RepresentantesService],
})
export class RepresentantesModule { }
