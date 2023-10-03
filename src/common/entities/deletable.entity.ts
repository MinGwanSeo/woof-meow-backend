import { BaseEntity, Column, Entity } from "typeorm";

type EntityStatus = 'ACTIVE' | 'DELETED' | 'INACTIVE';

@Entity()
export abstract class DeletableEntity extends BaseEntity {
    @Column({ type: 'string', nullable: false })
    entityStatus: EntityStatus;
}