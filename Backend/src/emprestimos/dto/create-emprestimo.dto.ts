import { Funcionario } from "src/funcionarios/entities/funcionario.entity";

export class CreateEmprestimoDto {
    valor: number;
    parcelas: number;
    emprestimoStatus: boolean;
    funcionario_id: number;
}
