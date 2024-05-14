import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emprestimo {
    @PrimaryGeneratedColumn()
    emprestimo_id: number;

    @Column()
    date: Date;

    @Column()
    parcelas: number;

    @Column()
    status: boolean;

    @ManyToOne(() => Funcionario, (funcionario) => funcionario.emprestimo)
    funcionario: Funcionario;
}
