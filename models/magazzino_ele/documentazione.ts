import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_documentazione_1",["ID",],{unique:true})
export class documentazione {

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
        name:"Titolo"
        })
    Titolo:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Versione"
        })
    Versione:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"File"
        })
    File:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Link"
        })
    Link:string | null;
        
}
