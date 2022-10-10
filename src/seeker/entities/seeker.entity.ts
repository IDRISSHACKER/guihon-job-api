import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinTable, CreateDateColumn,
} from 'typeorm';

@Entity()
export class Seeker extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    default: false
  })
  is_taked?: boolean;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  cni: string;

  @Column()
  sex: string;

  @Column()
  cv: string;

  @Column()
  avatar: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date

}
