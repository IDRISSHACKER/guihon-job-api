import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employe } from '../../employe/entities/employe.entity';

@Entity()
export class Presence extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({
    default: false,
  })
  ended?: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Employe, (employe) => employe.presences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Employe;
}
