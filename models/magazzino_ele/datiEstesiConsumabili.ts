import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("")
@Index("sqlite_autoindex_datiEstesiConsumabili_2",["ArolCode",],{unique:true})
@Index("sqlite_autoindex_datiEstesiConsumabili_1",["ID",],{unique:true})
export class datiEstesiConsumabili {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        unique: true,
        name:"ID"
        })
    ID:number;
        

    @Column("text",{ 
        nullable:true,
        unique: true,
        name:"ArolCode"
        })
    ArolCode:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"Stato"
        })
    Stato:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"DataInserimento"
        })
    DataInserimento:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"InseritoDa"
        })
    InseritoDa:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"RichiestoDa"
        })
    RichiestoDa:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"ModificatoDa"
        })
    ModificatoDa:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"DataModifica"
        })
    DataModifica:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Note"
        })
    Note:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"TipoParte"
        })
    TipoParte:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"PuntoLotto"
        })
    PuntoLotto:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"PuntoRiordino"
        })
    PuntoRiordino:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"ScortaSicurezza"
        })
    ScortaSicurezza:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"CostoUltimo"
        })
    CostoUltimo:string | null;
        
}
