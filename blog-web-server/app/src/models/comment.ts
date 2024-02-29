import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    owner!: number;

    @Column({ type: 'int' })
    post!: number;

    @Column({ type: 'varchar' })
    content!: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    constructor(id: number, owner: number, post: number, content: string, created_at: Date) {
        this.id = id;
        this.owner = owner;
        this.post = post;
        this.content = content;
        this.created_at = created_at;
    }
}