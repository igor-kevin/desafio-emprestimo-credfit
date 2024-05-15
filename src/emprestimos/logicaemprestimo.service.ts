import { Injectable, NotAcceptableException } from "@nestjs/common";
import axios from 'axios';
import { Funcionario } from "src/funcionarios/entities/funcionario.entity";

@Injectable()
export class LogicaEmprestimoService {

    async checkaAprovado(funcionario: Funcionario): Promise<boolean> {
        const score_funcionario = await this.getScore(funcionario);
        const scoreAprovacao = this.getMinScore(funcionario.funcionario_salario);
        console.log(scoreAprovacao)
        console.log(`Esse é o score do funcionario: ${score_funcionario}, tem que ser maior que aprovação ${scoreAprovacao}:\n Resultado é:${score_funcionario > +scoreAprovacao}`)
        if (scoreAprovacao == -1) {
            throw new Error('Salário acima de R$12000,00. Inválido para score.');
        }
        return (score_funcionario > scoreAprovacao);
    }


    private getMinScore(salario: number): number {
        switch (true) {
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

    async getStatus(): Promise<boolean> {
        const emprestimoStatus = await axios.get('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144')
        return emprestimoStatus.data.ok;
    }

}