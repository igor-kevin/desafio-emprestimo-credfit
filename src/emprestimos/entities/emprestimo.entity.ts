import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emprestimo {

    @PrimaryGeneratedColumn()
    emprestimo_id: number;

    @Column()
    valor: number;

    @Column()
    parcelas: number;

    @Column()
    primeiroPagamento: Date;

    @Column()
    emprestimoStatus: boolean;

    @ManyToOne(() => Funcionario, (funcionario) => funcionario.emprestimo)
    funcionario: Funcionario;
}
