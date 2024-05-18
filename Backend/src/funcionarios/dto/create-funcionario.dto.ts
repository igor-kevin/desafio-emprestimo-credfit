import { Representante } from "src/representantes/entities/representante.entity";

export class CreateFuncionarioDto {

    funcionario_nome: string;

    funcionario_cpf: number;

    funcionario_email: string;

    funcionario_senha: string;

    funcionario_salario: number;

    representante_id: number;

}
