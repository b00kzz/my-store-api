import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column({ name: "nick_name" })
    nickName: string

    @Column()
    avatar: string

    @Column()
    uuid?: string

    @Column()
    phone: string;

    @CreateDateColumn({
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: "created_at"
    })
    createdAt: Date;

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ default: null, nullable: true, name: "deleted_at" })
    deletedAt?: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
