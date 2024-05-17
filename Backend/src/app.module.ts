import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepresentantesModule } from './representantes/representantes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,  // NÃO USA EM PRODUÇÃO
      })
    }),
    RepresentantesModule,
    FuncionariosModule,
    EmprestimosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
