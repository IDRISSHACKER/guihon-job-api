import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn, CreateDateColumn
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @Column()
  refresh_token: string;


  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date
}
