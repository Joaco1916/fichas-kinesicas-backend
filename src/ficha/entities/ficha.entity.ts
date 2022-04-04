import { Paciente } from "src/paciente/entities/paciente.entity";
import { User } from "src/users/entities";
import { CreateDateColumn, Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

@Entity('fichas')
export class Ficha {
    @PrimaryGeneratedColumn()
    id: number;

    //Datos personales
    @Column({ type: 'varchar', nullable: false})
    ocupacion: string;

    @Column({ type: 'int', nullable: false})
    edad: number;

    @Column({ default:false, nullable: false})
    marcapasos: boolean;

    @Column({ default:false, nullable: false})
    audifonos: boolean;

    @Column({ default:false, nullable: false})
    embarazo: boolean;

    @Column({ default:false, nullable: false})
    protesis: boolean;

    //Motivo de consulta
    @Column({ type: 'varchar', nullable: false })
    diagnostico: string;
    
    @Column({ type: 'varchar', nullable: false })
    medico_derivante: string;
    
    @Column({ type: 'varchar', nullable: false })
    estudios_complementarios: string;
    
    @Column({ type: 'varchar', nullable: false })
    antecedentes: string;

    //Dolor
    @Column({ type: 'varchar', nullable: false })
    mecanismo_de_lesion: string;
    
    @Column({ type: 'varchar', nullable: false })
    antiguedad: string;
    
    @Column({ type: 'varchar', nullable: false })
    localizacion: string;
    
    @Column({ type: 'varchar', nullable: false })
    caracteristica: string;
    
    @Column({ type: 'varchar', nullable: false })
    irradiacion: string;
    
    @Column({ type: 'varchar', nullable: false })
    atenuacion_agravacion: string;

    @Column({ type: 'varchar', nullable: false })
    observaciones: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(_ => Paciente, (paciente) => paciente.fichas, { eager: true})
    @JoinColumn({ name: 'author' })
    author: Paciente;
}