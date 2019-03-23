import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Descrizione} from "./Descrizione";


@Entity()
export class Simbolo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sigla : string;

  @OneToOne( type => Descrizione)
  @JoinColumn()
  descrizione : Descrizione;

}
