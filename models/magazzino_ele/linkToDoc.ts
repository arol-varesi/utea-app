import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_linkToDoc_1",["ID",],{unique:true})
export class linkToDoc {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        unique: true,
        name:"ID"
        })
    ID:number;
        

    @Column("text",{ 
        nullable:true,
        name:"ArolCode"
        })
    ArolCode:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"LinkDoc"
        })
    LinkDoc:number | null;
        
}
