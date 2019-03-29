import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_tipologiaDocumentazione_1",["ID",],{unique:true})
export class tipologiaDocumentazione {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        unique: true,
        name:"ID"
        })
    ID:number;
        

    @Column("integer",{ 
        nullable:true,
        name:"Tipo"
        })
    Tipo:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Descrizione"
        })
    Descrizione:string | null;
        
}
