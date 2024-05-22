import { Emprestimo } from "src/emprestimos/entities/emprestimo.entity";
import { Representante } from "src/representantes/entities/representante.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    funcionario_id: number;

    @Column()
    funcionario_nome: string;

    @Column({ unique: true, type: 'int' })
    funcionario_cpf: number;

    @Column({ unique: true })
    funcionario_email: string;

    @Column()
    funcionario_senha: string;

    @Column({ nullable: true, type: 'int' })
    funcionario_salario: number;

    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.funcionario)
    emprestimo: Emprestimo[]

    @ManyToOne(() => Representante, (funcionario) => funcionario.funcionario)
    @JoinColumn({ name: 'representante_id' })
    empresa: Representante;

}
