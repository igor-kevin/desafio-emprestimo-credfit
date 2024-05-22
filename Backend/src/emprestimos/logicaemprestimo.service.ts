import { Injectable, NotAcceptableException } from "@nestjs/common";
import axios from 'axios';
import { Funcionario } from "src/funcionarios/entities/funcionario.entity";

@Injectable()
export class LogicaEmprestimoService {
    constructor() {

    }

    // Checka se o emprestimo que o funcionário está pedindo foi aprovado
    async checkaAprovado(funcionario: Funcionario): Promise<boolean> {
        const score_funcionario = await this.getScore(funcionario);
        const scoreAprovacao = this.getMinScore(funcionario.funcionario_salario);

        if (scoreAprovacao == -1) {
            throw new Error('Salário acima de R$12000,00. Inválido para score.');
        }
        if (scoreAprovacao == -2) {
            throw new Error('Funcionário não tem salário definido. Pode ser representante.');
        }
        return (score_funcionario >= scoreAprovacao);
    }

    // Checka se o funcioniário é de uma empresa conveniada.
    isConveniado(funcionario: Funcionario): boolean {
        if (funcionario.empresa != null) {
            return true
        }
        return false;
    }

    // Checka se as parcelas do emprestimo estão menor do que 35% do salário
    isDentroDoBolso(funcionario: Funcionario, valor: number, parcelas: number): boolean {
        const salario = funcionario.funcionario_salario * 0.35

        let porcentagemValor = (valor / parcelas)
        if ((porcentagemValor > salario)) {
            return false;
        }
        return true;
    }

    // Retorna o score mínimo dado um salário.
    private getMinScore(salario: number | null): number {
        switch (true) {
            case salario == null:
                return -2
            case salario <= 2000:
                return 400;
            case salario <= 4000 && salario > 2000:
                return 500;
            case salario <= 8000 && salario > 4000:
                return 600;
            case salario <= 12000 && salario > 8000:
                return 700;
            case salario > 12000:
                return -1
        }
    }

    /*  Finge que recebe o argumento funcionário, indicando que procuraria pelo score da pessoa.
    *   A pesquisa poderia ser pelo nome, email ou cpf.
    *   Como estamos usando apenas o mock deixei sem utilizar o funcionario.
    */
    private async getScore(funcionario): Promise<number> {
        const score = await axios.get('https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a')
        return score.data.score;
    }


    // Retorna o status de entrega do empréstimo. Poderia usar o funcionário como parametro igual ao método de cima para fingimento.
    async getStatus(): Promise<boolean> {
        const emprestimoStatus = await axios.get('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144')
        return emprestimoStatus.data.ok;
    }

}