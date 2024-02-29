import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar' })
    username!: string;

    @Column({ type: 'varchar' })
    password!: string;

    @Column({ type: 'varchar' })
    name!: string;

    @Column({ type: 'varchar' })
    dob!: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
    constructor(id: number, username: string, password: string, name: string, dob: string, created_at: Date) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.dob = dob;
        this.created_at = created_at;
    }
}