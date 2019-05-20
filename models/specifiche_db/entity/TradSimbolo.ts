import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, BaseEntity, ManyToOne} from "typeorm";
import {DescSimbolo} from "./DescSimbolo";
import {Lingua} from "./Lingua";


@Entity()
export class TradSimbolo extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  traduzione : string;

  @ManyToOne( type => DescSimbolo , descrizione => descrizione.traduzioni)
  descrizione : DescSimbolo;

  @ManyToOne( type => Lingua , { eager: true })
  @JoinColumn()
  lingua : Lingua;

}
