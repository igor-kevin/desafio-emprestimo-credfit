import { Funcionario } from "src/funcionarios/entities/funcionario.entity";

export class CreateEmprestimoDto {
    date: Date;
    valor: number;
    parcelas: number;
    status: boolean;
    datas_pagamento: Date[]
    funcionario: Funcionario;
}
