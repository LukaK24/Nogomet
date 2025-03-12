import { useEffect, useState } from "react";
import IgraciService from "../../service/IgraciService";  // Provjeri ispravan put
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function IgraciPregled() {

    const [igraci, setIgraci] = useState([]);
    const navigate = useNavigate();

    // Asinhrona funkcija za dohvat igrača
    async function dohvatiIgrace() {
        try {
            const odgovor = await IgraciService.dohvatiIgrace();  // Provjerili smo da ovo koristi ispravan naziv
            setIgraci(odgovor);  // Postavljanje podataka u stanje
        } catch (error) {
            console.error("Greška pri dohvaćanju igrača:", error);  // U slučaju greške
        }
    }

    // Dohvati igrače kada se stranica učita
    useEffect(() => {
        dohvatiIgrace();  // Poziv funkcije za dohvat igrača
    }, []);

    // Funkcija za brisanje igrača
    function obrisi(sifra) {
        if (!confirm('Sigurno obrisati?')) {
            return;
        }
        brisanjeIgraca(sifra);
    }

    // Asinhrona funkcija za brisanje igrača
    async function brisanjeIgraca(sifra) {
        try {
            const odgovor = await IgraciService.obrisi(sifra);  // Poziv funkcije za brisanje
            if (odgovor.greska) {
                alert(odgovor.poruka);
                return;
            }
            dohvatiIgrace();  // Ponovno dohvati igrače nakon brisanja
        } catch (error) {
            console.error("Greška pri brisanju igrača:", error);  // U slučaju greške
        }
    }

    return (
        <>
            <Link
                to={RouteNames.IGRACI_NOVI}
                className="btn btn-success siroko"
            >Dodaj novog igrača</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Pozicija</th>
                        <th>OIB</th>
                        <th>Klub ID</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {igraci && igraci.map((igrac, index) => (  // Ovdje koristimo "igrac" kao varijablu unutar map funkcije
                        <tr key={index}>
                            <td>{igrac.ime}</td>
                            <td>{igrac.prezime}</td>
                            <td>{igrac.pozicija}</td>
                            <td>{igrac.oib}</td>
                            <td>{igrac.klub_id}</td>
                            <td>
                                <Button
                                    onClick={() => navigate(`/igraci/${igrac.sifra}`)}
                                >Promjena</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={() => obrisi(igrac.sifra)}
                                >Obriši</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
