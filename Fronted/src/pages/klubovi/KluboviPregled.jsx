import { useEffect, useState } from "react"
import KlubService from "../../service/KlubService"
import { Table } from "react-bootstrap";


export default function KluboviPregled(){
    const [klubovi, setKlubovi] = useState();



    async function dohvatiKlubove(){
        const odgovor = KlubService.get()
        setKlubovi(odgovor)

    }
        
    

    //hooks (kuka) se izvodi prilikom dolaka na tranicu klubovi
    useEffect(() =>{
        dohvatiKlubove();
    },[])

    return(
        <>
        <Table>
            <thead>
                
            </thead>
        </Table>
        </>


    )
}