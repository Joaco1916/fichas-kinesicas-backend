import { User } from "src/users/entities";
import { Ficha } from "src/ficha/entities/ficha.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn } from "typeorm";

@Entity('pacientes')
export class Paciente {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255, default: '', nullable: false })
    name: string;

    @Column({ name:'last_name', type: 'varchar', length: 255, default: '', nullable: false })
    lastName: string;

    @Column({ type: 'varchar', length: 255, nullable: false})
    email: string;

    @Column({ type: 'int', nullable: false})
    telefono: number;

    @Column({ type: 'varchar', length: 255, nullable: false})
    calle: string;

    @Column({ type: 'int', nullable: false})
    nroCalle: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(_ => User, (user) => user.pacientes, { eager: true})
    @JoinColumn({ name: 'author' })
    author: User;

    @OneToMany( _ => Ficha, ficha => ficha.author, { cascade: true } )
    fichas: Ficha;
}