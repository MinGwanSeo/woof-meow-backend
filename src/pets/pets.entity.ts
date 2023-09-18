import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export default class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @JoinColumn()
    user: User;

    @Column()
    ageMonths: number;

    @Column()
    birthYear: number;

    @Column()
    birthMonth: number;

    @Column()
    birthDate: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}