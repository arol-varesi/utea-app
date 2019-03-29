import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_codificatiDS_1",["ID",],{unique:true})
export class codificatiDS {

    @Column("integer",{ 
        nullable:true,
        primary:true,
        unique: true,
        name:"ID"
        })
    ID:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Name"
        })
    Name:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"FileExtension"
        })
    FileExtension:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Link"
        })
    Link:string | null;
        
}
