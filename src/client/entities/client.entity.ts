import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  JoinTable, OneToOne,
} from 'typeorm';
import { Image } from '../../image/entities/image.entity';
import {Planing} from "../../planing/entities/planing.entity";

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({
    default: 'noemail@test.com',
  })
  email?: string;

  @Column()
  tel: string;

  @Column({
    default: 'Default.jpg',
  })
  avatar?: string;

  @Column({
    default: 'Douala',
  })
  lieux?: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Image, (image) => image.client)
  @JoinTable()
  images: Image[];

  @OneToOne(() => Planing, (planing) => planing.client)
  @JoinTable()
  planing: Planing;
}
