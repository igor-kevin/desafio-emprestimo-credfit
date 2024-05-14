import { Representante } from "src/representantes/entities/representante.entity";

export class CreateFuncionarioDto {

    funcionario_nome: string;

    funcionario_email: string;

    funcionario_senha: string;

    funcionario_salario: number;

    empresa: Representante;

}
