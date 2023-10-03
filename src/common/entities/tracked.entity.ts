import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class TrackedEntity extends BaseEntity {
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}