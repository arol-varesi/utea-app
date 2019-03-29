import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_consumabili_2",["ArolCode",],{unique:true})
@Index("sqlite_autoindex_consumabili_1",["ID",],{unique:true})
export class consumabili {

    @Column("integer",{ 
        nullable:true,
        primary:true,
        unique: true,
        name:"ID"
        })
    ID:number | null;
        

    @Column("text",{ 
        nullable:true,
        unique: true,
        name:"ArolCode"
        })
    ArolCode:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"CommercialCode"
        })
    CommercialCode:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Description"
        })
    Description:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Manufacturer"
        })
    Manufacturer:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"SupplementaryDescription"
        })
    SupplementaryDescription:string | null;
        
}
