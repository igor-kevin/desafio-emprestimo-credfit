import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepresentantesModule } from './representantes/representantes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';

@Module({
  imports: [RepresentantesModule, FuncionariosModule, EmprestimosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
