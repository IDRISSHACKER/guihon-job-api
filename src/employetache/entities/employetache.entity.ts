import {
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
  BaseEntity, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToMany,
} from 'typeorm';
import {Tache} from "../../tache/entities/tache.entity";

@Entity()
export class Employetache extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  tacheId: string;

  @Column({default: false})
  isAdmin?: boolean;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Tache, (tache) => tache.employestaches, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'tacheId' })
  taches: Tache[];

}
