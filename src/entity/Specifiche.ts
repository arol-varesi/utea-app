import {Entity, PrimaryGeneratedColumn, Column, TreeRepository} from "typeorm";

@Entity()
export class Commessa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length : 5})
  matricola: string;

  @Column("text")
  tipo: string;

  @Column()
  cliente: string;

  @Column()
  riferimento: string;

}



@Entity()
export class Modulo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  nome: string;

  @Column()
  tipo: string;

  @Column()
  cliente: string;

  @Column()
  riferimento: string;

}

