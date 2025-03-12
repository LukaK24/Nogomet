import { useEffect, useState } from "react"
import UtakmiceService from "../../service/UtakmiceService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function UtakmicePregled(){

    const[utakmice, setUtakmice] = useState([]);
    const navigate = useNavigate();

    async function dohvatiUtakmice(){
        
        try {
            const odgovor = await UtakmiceService.get();
            console.log("📢 API Response:", odgovor);
            
            if (!Array.isArray(odgovor)) {
                setUtakmice([]); // Ako ne dobijemo niz, postavi prazan niz da ne pukne aplikacija
                return;
            }
    
            setUtakmice(odgovor);
        } catch (error) {
            console.error("❌ Greška kod dohvata utakmica:", error);
            setUtakmice([]); // Postavi prazan niz u slučaju greške
        }
    }

    async function get(){
        return await HttpService.get('/Utakmice')
        .then((odgovor)=> {
            console.log("📥 Dobijen odgovor od API-ja:", odgovor);
            return odgovor.data;
        })
        .catch((e) => {
            console.error("❌ Greška pri dohvatu utakmica:", e);
            return null;
        });
    }

    useEffect(()=>{
        dohvatiUtakmice();
    },[])



    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeUtakmice(sifra);
    }

    async function brisanjeUtakmice(sifra) {
        const odgovor = await UtakmicaService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiUtakmice();
    }

    return(
        <>
        <Link
        to={RouteNames.UTAKMICA_NOVA}
        className="btn btn-success siroko"
        >Dodaj novu utakmicu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Domaći klub</th>
                    <th>Gostujući klub</th>
                    
                </tr>
            </thead>
            <tbody>
                    {Array.isArray(utakmice) ? utakmice.map((utakmica, index) => (
                        <tr key={index}>
                            <td>{utakmica.datum}</td>
                            <td>{utakmica.domaci_klub}</td>
                            <td>{utakmica.gostujuci_klub}</td>
                            <td>
                                <Button onClick={() => navigate(`/utakmice/${utakmica.sifra}`)}>
                                    Promjena
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button variant="danger" onClick={() => obrisi(utakmica.sifra)}>
                                    Obriši
                                 </Button>
                         </td>
                              </tr>
                     )) : <tr><td colSpan="4">Nema utakmica</td></tr>}
                            </tbody>

        </Table>
        </>
    )
}
