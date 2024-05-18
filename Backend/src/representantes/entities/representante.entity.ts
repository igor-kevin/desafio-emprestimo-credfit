import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Representante {
    @PrimaryGeneratedColumn()
    representante_id: number;

    @Column({ unique: true })
    representante_cnpj: number;

    @Column()
    representante_nome_social: string;

    @Column()
    representante_nome: string;

    @Column({ unique: true })
    representante_cpf: number;

    @Column({ unique: true })
    representante_email: string;

    @Column()
    representante_senha: string;

    @OneToMany(() => Funcionario, (funcionario) => funcionario.empresa)
    empresa: Representante;
}
