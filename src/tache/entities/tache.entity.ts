import {
  Entity,
  Column,
  UpdateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne, ManyToMany, JoinTable
} from 'typeorm';
import {Planing} from "../../planing/entities/planing.entity";
import {Employetache} from "../../employetache/entities/employetache.entity";

@Entity()
export class Tache extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id?: string;

  @Column({default: ''})
  title?: string;

  @Column()
  planingId: string;

  @Column({default: false})
  ended?: boolean;

  @Column({ default: ''})
  rapport?: string;

  @Column({ default: ''})
  startImg?: string;

  @Column({ default: ''})
  start_at?: string;

  @Column({ default: ''})
  endImg?: string;

  @Column({ default: ''})
  ended_at?: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Planing, (planing) => planing.taches, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'planingId' })
  planing: Planing;

  @ManyToMany(() => Employetache, (employetache) => employetache.taches)
  @JoinTable()
  employestaches: Employetache[];

}
