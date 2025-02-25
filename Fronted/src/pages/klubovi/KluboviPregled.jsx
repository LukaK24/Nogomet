import { useEffect, useState } from "react"
import KlubService from "../../service/KlubService"
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";



export default function KluboviPregled(){
    const [klubovi, setKlubovi] = useState();
    const navigate = useNavigate();



    async function dohvatiKlubove(){
        const odgovor = await KlubService.get()
        setKlubovi(odgovor)

    }
        
    

    //hooks (kuka) se izvodi prilikom dolaka na tranicu klubovi
    useEffect(() =>{
        
        dohvatiKlubove();
    },[])

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return
        }
        brisanjeKluba(sifra);
    }

    async function brisanjeKluba(sifra){
        const odgovor = await KlubService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiKlubove();
    }
 

    return(
        <>
        <Link
        to={RouteNames.KLUB_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi klub</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>    
                    <th>Naziv</th>
                    <th>Osnovan</th>
                    <th>Stadion</th>
                    <th>Država</th>
                    <th>Liga</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>

                {klubovi && klubovi.map((Klub,index)=>(
                    <tr key={index}>
                        <td>
                            {Klub.naziv}
                        </td>
                        <td>
                            {Klub.osnova}
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
                        <td>
                            <Button
                            onClick={()=>navigate(`/klubovi/${Klub.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(Klub.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>


    )
}