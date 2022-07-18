import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Word extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    unique: true,
  })
    value: string;

  @Column({
    default: false,
  })
    isCurrent: boolean;

  @Column({
    default: 0,
  })
    hits: number;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
