import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { RepresentantesModule } from 'src/representantes/representantes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Representante } from 'src/representantes/entities/representante.entity';
import { RepresentantesController } from 'src/representantes/representantes.controller';
import { RepresentantesService } from 'src/representantes/representantes.service';

@Module({
  imports: [RepresentantesModule, TypeOrmModule.forFeature([Funcionario, Representante])],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
})
export class FuncionariosModule { }
