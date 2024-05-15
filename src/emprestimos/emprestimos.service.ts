import { Injectable } from '@nestjs/common';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from './dto/update-emprestimo.dto';
import { LogicaEmprestimoService } from './logicaemprestimo.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprestimo } from './entities/emprestimo.entity';
import { Repository } from 'typeorm';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { FuncionariosService } from 'src/funcionarios/funcionarios.service';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly emprestimoRepository: Repository<Emprestimo>,
    private readonly logica: LogicaEmprestimoService,
    private readonly funcionarioService: FuncionariosService

  ) { }



  async create(createEmprestimoDto: CreateEmprestimoDto, funcionarioRepository: Repository<Funcionario>) {
    const funcionario: Funcionario = createEmprestimoDto.funcionario;
    console.log('Create...')
    try {
      console.log('try')
      const aprovado = await this.logica.checkaAprovado(funcionario)
      console.log(aprovado)
      console.log('Esse de cima é se foi aprovado o funcionario')
      if (!aprovado) {
        return "Não foi feito o empréstimo, score muito baixo."
      }
      console.log('aprovado')
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
    return `This action returns all emprestimos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprestimo`;
  }

  update(id: number, updateEmprestimoDto: UpdateEmprestimoDto) {
    return `This action updates a #${id} emprestimo`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprestimo`;
  }
}
