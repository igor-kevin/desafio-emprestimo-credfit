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

    const funcionario: Funcionario = await this.funcionarioRepository.findOne({ where: { funcionario_id: createEmprestimoDto.funcionario_id } });
    console.log(funcionario);
    console.log("Empresa: " + funcionario.empresa)


    // if (!this.logica.isConveniado(funcionario)) {
    //   return "Não foi feito o empréstimo, pois não é um funcionário de uma empresa conveniada."
    // }

    if (!this.logica.isDentroDoBolso(funcionario, (createEmprestimoDto.valor * 100), createEmprestimoDto.parcelas)) {
      return `A parcela está acima do aceito para o seu salário. \n R$${((funcionario.funcionario_salario) * 0.35).toFixed(2)} é o máximo para cada uma das suas parcelas.\n A que você está tentando é R$${createEmprestimoDto.valor / createEmprestimoDto.parcelas}`
    }
    try {
      const aprovado = await this.logica.checkaAprovado(funcionario)
      if (!aprovado) {
        return "Não foi feito o empréstimo, score muito baixo."
      }
      let statusAtual: boolean = await this.logica.getStatus()
      console.log(statusAtual)
      const emprestimo: Emprestimo = {
        emprestimo_id: undefined,
        valor: createEmprestimoDto.valor,
        parcelas: createEmprestimoDto.parcelas,
        primeiroPagamento: this.proxVencimento(),
        emprestimoStatus: statusAtual,
        funcionario: funcionario,
      }
      console.log(emprestimo)
      return `Emprestimo com sucesso! No valor de R$${emprestimo.valor} em ${emprestimo.parcelas} parcelas. No total de R$${emprestimo.valor / emprestimo.parcelas} por parcela, e o primeiro pagamento em ${emprestimo.primeiroPagamento.getDay()}/${emprestimo.primeiroPagamento.getMonth()}/${emprestimo.primeiroPagamento.getFullYear()}`


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

  findEmprestimosPorFuncionario(funcionario_id: number): Promise<Emprestimo[]> {
    return this.emprestimoRepository.find({
      where: { funcionario: { funcionario_id: funcionario_id } }
    });
  }


  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
