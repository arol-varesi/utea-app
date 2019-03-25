import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, BaseEntity} from "typeorm";
import {Descrizione} from "./Descrizione";


@Entity()
export class Simbolo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sigla : string;

  @OneToOne( type => Descrizione , {
    eager: true
  })
  @JoinColumn()
  descrizione : Descrizione;

}
