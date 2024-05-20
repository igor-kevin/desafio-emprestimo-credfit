import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionario;
}
