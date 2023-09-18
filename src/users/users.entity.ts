import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['email', 'loginType'])
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ length: 25, nullable: false })
    loginType: string;

    @Column({ length: 255, nullable: true })
    password: string;

    @Column({ length: 255, nullable: true })
    socialId: string;

    @Column({ length: 255, nullable: true })
    name: string;

    @Column({ length: 255, nullable: true })
    nickname: string;

    @Column({ length: 255, nullable: true })
    profileImage: string;

    @Column({ length: 255, nullable: false })
    createdAt: Date;

    @Column({ length: 255, nullable: false })
    updatedAt: Date;
}