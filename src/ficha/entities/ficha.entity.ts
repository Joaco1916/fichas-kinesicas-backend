import { User } from "src/users/entities";
import { CreateDateColumn, Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

@Entity('fichas')
export class Ficha {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    diagnostico: string;
    
    @Column({ type: 'varchar', nullable: false })
    medico_derivante: string;
    
    @Column({ type: 'varchar', nullable: true })
    estudios_complementarios: string;
    
    @Column({ type: 'varchar', nullable: true })
    antecedentes: string;

    @Column({ type: 'varchar', nullable: false })
    mecanismo_de_lesion: string;
    
    @Column({ type: 'varchar', nullable: false })
    antiguedad: string;
    
    @Column({ type: 'varchar', nullable: false })
    localizacion: string;
    
    @Column({ type: 'varchar', nullable: false })
    caracteristica: string;
    
    @Column({ type: 'varchar', nullable: true })
    irradiacion: string;
    
    @Column({ type: 'varchar', nullable: true })
    atenuacion_agravacion: string;

    @Column({ type: 'varchar', nullable: true })
    observaciones: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(_ => User, (user) => user.fichas, { eager: true})
    @JoinColumn({ name: 'author' })
    author: User;
}