import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn, OneToOne, JoinColumn, OneToMany, JoinTable,
} from 'typeorm';
import {Client} from "../../client/entities/client.entity";
import {Tache} from "../../tache/entities/tache.entity";
@Entity()

export class Planing extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id?: string;

  @Column()
  clientId: string;

  @Column()
  rewindDay: number;

  @Column()
  prix: number;

  @UpdateDateColumn()
  updated_at?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @OneToOne(() => Client, (client) => client.planing, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => Tache, (tache) => tache.planing)
  @JoinTable()
  taches: Tache[];
}
