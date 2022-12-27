import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Presence } from '../../presence/entities/presence.entity';

@Entity()
export class Employe extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({
    default: 'tetttttt',
  })
  cni?: string;

  @Column()
  email: string;

  @Column()
  tel: string;

  @Column({
    default: 'Avatar.jpg',
  })
  avatar?: string;

  @Column({
    default: '50000',
  })
  basesalary?: string;

  @Column({
    default: '0000',
  })
  secret?: string;

  @Column({
    default: false,
  })
  isAdmin?: boolean;

  @Column({
    default: false,
  })
  isSecretary?: boolean;

  @Column({
    default: '',
  })
  token?: string;

  @Column({
    default: '',
  })
  refreshToken?: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Presence, (presence) => presence.user)
  @JoinTable()
  presences: Presence;
}
