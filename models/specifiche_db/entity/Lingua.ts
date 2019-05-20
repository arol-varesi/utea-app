import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, JoinTable, BaseEntity, ManyToOne} from "typeorm";

@Entity()
export class Lingua extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: String, length: 3, unique: true})
  sigla : string;

  @Column()
  nomeIta: string;

  @Column()
  nome: string;
}