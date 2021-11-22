import { hash } from "bcrypt";
import { Ficha } from "src/ficha/entities/ficha.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255})
    name: string;

    @Column({ name:'last_name', type: 'varchar', length: 255})
    lastName: string;

    @Column({ type: 'varchar', length: 255, nullable: false})
    email:string;

    @Column({ type: 'varchar', length: 128, nullable: false, select: false})
    password: string;

    @Column({ type: 'bool', default: true})
    status: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    /*@OneToMany( _ => Ficha, ficha => ficha.author, { cascade: true } )
    fichas: Ficha;*/

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }
}
