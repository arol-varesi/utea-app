import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, BaseEntity} from "typeorm";
import {DescSimbolo} from "./DescSimbolo";


@Entity()
export class Simbolo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sigla : string;

  @OneToOne( type => DescSimbolo , { eager: true })
  @JoinColumn()
  descrizione : DescSimbolo;

}
