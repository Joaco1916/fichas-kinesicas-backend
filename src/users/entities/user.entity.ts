import { hash } from "bcrypt";
import { Ficha } from "src/ficha/entities/ficha.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255, default: '', nullable: true })
    name: string;

    @Column({ name:'last_name', type: 'varchar', length: 255, default: '', nullable: true })
    lastName: string;

    @Column({ type: 'varchar', length: 255, nullable: false})
    email:string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false})
    password: string;

    @Column({ type: 'simple-array'})
    roles: string[]

    @Column({ type: 'bool', default: true})
    status: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @OneToMany( _ => Paciente, paciente => paciente.author, { cascade: true } )
    pacientes: Paciente;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }
}
