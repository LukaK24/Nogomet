import { useEffect, useState } from "react"
import KlubService from "../../service/KlubService"
import { Table } from "react-bootstrap";


export default function KluboviPregled(){
    const [klubovi, setKlubovi] = useState();



    async function dohvatiKlubove(){
        const odgovor = await KlubService.get()
        setKlubovi(odgovor)

    }
        
    

    //hooks (kuka) se izvodi prilikom dolaka na tranicu klubovi
    useEffect(() =>{
        dohvatiKlubove();
    },[])

    return(
        <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>    
                    <th>Naziv</th>
                    <th>Osnovan</th>
                    <th>Stadion</th>
                    <th>Država</th>
                    <th>Liga</th>
                </tr>
            </thead>
            <tbody>
                {klubovi && klubovi.map((Klub,index)=>(
                    <tr key={index}>
                        <td>
                            {Klub.naziv}
                        </td>
                        <td>
                            {Klub.osnovan}
                        </td>
                        <td>
                            {Klub.stadion}
                        </td>
                        <td>
                            {Klub.drzava}
                        </td>
                        <td>
                            {Klub.liga}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>


    )
}