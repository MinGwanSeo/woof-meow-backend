import { DeletableEntity } from "src/common/entities/deletable.entity";
import { Column, Entity } from "typeorm";
type petType = 'CAT' | 'DOG';

@Entity('pet')
export class Pet extends DeletableEntity {

    @Column({ type: 'string', nullable: false })
    petType: petType;

    @Column({ type: 'string', nullable: false })
    name: string;

    @Column({ type: 'string', nullable: false })
    userId: number;

    @Column({ type: 'string', nullable: true })
    ageMonth: number;

    @Column({ type: 'string', nullable: true })
    birthYear: number;

    @Column({ type: 'string', nullable: true })
    birthMonth: number;

    @Column({ type: 'string', nullable: true })
    birthDate: number;
}
