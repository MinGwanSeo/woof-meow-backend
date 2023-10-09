import { DeletableEntity } from '../../common/entities/deletable.entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

type LoginType = 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'KAKAO';

@Entity('user')
@Unique(['socialId', 'loginType'])
export class User extends DeletableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @Column({ type: 'varchar', nullable: false })
    lastName: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    emailVerified: boolean;

    @Column({ type: 'varchar', nullable: true })
    loginType: LoginType;

    @Column({ type: 'varchar', nullable: true })
    nickname: string;

    @Column({ type: 'varchar', nullable: true })
    passWord: string;

    @Column({ type: 'varchar', nullable: false })
    socialId: string;

    @Column({ type: 'varchar', nullable: true })
    profileImage: string;
}
