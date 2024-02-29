import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    owner!: number;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'varchar' })
    content!: string;

    @Column('varchar', { array: true })
    tags!: string[];;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    constructor(id: number, owner: number, title: string, content: string, tags: string[], created_at: Date) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.created_at = created_at;
    }
}