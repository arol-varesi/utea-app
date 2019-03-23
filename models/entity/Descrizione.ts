import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Descrizione {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testo : string;

}
