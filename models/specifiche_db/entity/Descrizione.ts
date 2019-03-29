import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity} from "typeorm";

@Entity()
export class Descrizione extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testo : string;

}
