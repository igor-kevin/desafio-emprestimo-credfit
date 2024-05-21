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

    @OneToMany(() => Funcionario, (funcionario) => funcionario.empresa)
    funcionario: Funcionario;
}
