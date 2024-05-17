import { Emprestimo } from "src/emprestimos/entities/emprestimo.entity";
import { Representante } from "src/representantes/entities/representante.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    funcionario_id: number;

    @Column()
    funcionario_nome: string;

    @Column({ unique: true })
    funcionario_email: string;

    @Column()
    funcionario_senha: string;

    @Column()
    funcionario_salario: number;

    @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.funcionario)
    emprestimo: Emprestimo[]

    @ManyToOne(() => Representante, (funcionario) => funcionario.empresa)
    empresa: Representante;

}
