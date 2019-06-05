import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BaseEntity} from "typeorm";
import {TradSimbolo} from './TradSimbolo'

@Entity()
export class DescSimbolo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testo : string;

  @OneToMany( type => TradSimbolo ,traduzione => traduzione.descrizione)
    traduzioni: TradSimbolo[];

}
