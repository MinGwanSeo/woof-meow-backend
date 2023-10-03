import { DeletableEntity } from '../../common/entities/deletable.entity';
import { Column, Entity, Unique } from 'typeorm';

type LoginType = 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'NAVER' | 'KAKAO';

@Entity('user')
@Unique(['socialId', 'loginType'])
export class User extends DeletableEntity {

    @Column({ type: 'string', nullable: false })
    firstName: string;

    @Column({ type: 'string', nullable: false })
    lastName: string;

    @Column({ type: 'string', nullable: true })
    email: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    emailVerified: boolean;

    @Column({ type: 'string', nullable: true })
    loginType: LoginType;

    @Column({ type: 'string', nullable: true })
    nickname: string;

    @Column({ type: 'string', nullable: true })
    passWord: string;

    @Column({ type: 'string', nullable: false })
    socialId: string;

    @Column({ type: 'string', nullable: true })
    profileImage: string;
}
