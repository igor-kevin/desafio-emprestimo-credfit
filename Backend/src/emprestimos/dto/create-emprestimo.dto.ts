import { Funcionario } from "src/funcionarios/entities/funcionario.entity";

export class CreateEmprestimoDto {
    valor: number;
    parcelas: number;
    funcionario_id: number;
}
