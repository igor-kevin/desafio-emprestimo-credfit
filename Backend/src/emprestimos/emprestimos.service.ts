import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Repository } from 'typeorm';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Representante } from 'src/representantes/entities/representante.entity';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly emprestimoRepository: Repository<Emprestimo>,

    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,

    @InjectRepository(Representante)
    private readonly representanteRepository: Repository<Representante>,

    private readonly logica: LogicaEmprestimoService,

  ) { }


  async create(createEmprestimoDto: CreateEmprestimoDto) {
    let checkingEmprestimoStatus: number = 0;
    let statusAtual = false;
    const funcionario: Funcionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: createEmprestimoDto.funcionario_id }, relations: ['empresa'] });

    if (!this.logica.isConveniado(funcionario)) {
      checkingEmprestimoStatus = 1;
      // return "Não foi feito o empréstimo, pois não é um funcionário de uma empresa conveniada."
    }

    if (!this.logica.isDentroDoBolso(funcionario, (createEmprestimoDto.valor), createEmprestimoDto.parcelas)) {
      checkingEmprestimoStatus = 2;
      // return `A parcela está acima do aceito para o seu salário. \n R$${((funcionario.funcionario_salario) * 0.35).toFixed(2)} é o máximo para cada uma das suas parcelas.\n A que você está tentando é R$${createEmprestimoDto.valor / createEmprestimoDto.parcelas}`
    }
    try {
      const aprovado = await this.logica.checkaAprovado(funcionario)
      if (!aprovado) {
        checkingEmprestimoStatus = 3;
        // return "Não foi feito o empréstimo, score muito baixo."
      }
      if (checkingEmprestimoStatus != 0) {
        statusAtual = await this.logica.getStatus()
      }
      console.log("O status é: " + statusAtual)
      const emprestimo = {
        valor: createEmprestimoDto.valor,
        parcelas: createEmprestimoDto.parcelas,
        primeiroPagamento: this.proxVencimento(),
        emprestimoStatus: checkingEmprestimoStatus,
        isEmprestimoEntregue: statusAtual,
        funcionario: funcionario,
      }
      console.log('e', emprestimo)
      const listacompletaemprestimo = await this.findEmprestimosPorFuncionario(funcionario.funcionario_id)
      for (let emprestimo of listacompletaemprestimo) {
        console.log(emprestimo);
      }

      console.log("a lista completa seria: " + listacompletaemprestimo);

      const emprestimoCompleto = this.emprestimoRepository.create(emprestimo)
      return await this.emprestimoRepository.save(emprestimoCompleto)


    } catch (error) {
      return { error: error.message }
    }

  }

  private proxVencimento(): Date {
    const hoje = new Date();
    const proxPagamento = new Date(hoje.getFullYear(), hoje.getMonth() + 1, hoje.getDay());
    return proxPagamento;
  }

  findAll() {
    return this.emprestimoRepository.find();
  }

  async findEmprestimosPorFuncionario(funcionario_id: number): Promise<Emprestimo[]> {
    const listacompleta = await this.emprestimoRepository.find({
      where: { funcionario: { funcionario_id: funcionario_id } }
    });
    return listacompleta;
  }


  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
