import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emprestimo {

    @PrimaryGeneratedColumn()
    emprestimo_id: number;

    @Column({ type: 'int' })
    valor: number;

    @Column({ type: 'int' })
    parcelas: number;

    @Column()
    primeiroPagamento: Date;

    // Caso o empréstimo não seja aceito retorna o motivo.
    @Column({ type: 'int' })
    emprestimoStatus: number;


    @Column({ type: 'boolean' })
    isEmprestimoEntregue: boolean;

    @ManyToOne(() => Funcionario, (funcionario) => funcionario.emprestimo)
    @JoinColumn({ name: 'funcionario_id' })
    funcionario: Funcionario;
}
