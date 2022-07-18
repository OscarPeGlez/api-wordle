import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    unique: true,
  })
    username: string;

  @Column({
    default: 0,
  })
    userAttempts: number;

  @Column({
    default: 0,
  })
    wins: number;

  @Column({
    default: 0,
  })
    matchs: number;

  @Column({
    default: false,
  })
    isWinner: boolean;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;
}
