import { useEffect, useState } from "react";
import TrenerService from "../../service/TrenerService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function TreneriPregled() {
    const [treneri, setTreneri] = useState([]);
    const navigate = useNavigate();

    async function dohvatiTrenere() {
        try {
            const odgovor = await TrenerService.get();
            console.log("Dobijeni treneri:", odgovor);

            if (Array.isArray(odgovor)) {
                setTreneri(odgovor);
            } else if (odgovor && Array.isArray(odgovor.treneri)) {
                setTreneri(odgovor.treneri);
            } else {
                setTreneri([]); // Ako nije validan format, postavi prazan niz
            }
        } catch (error) {
            console.error("Greška pri dohvaćanju trenera:", error);
            setTreneri([]);
        }
    }

    useEffect(() => {
        dohvatiTrenere();
    }, []);

    async function obrisiTrenera(sifra) {
        if (!window.confirm("Sigurno obrisati?")) return;

        try {
            const odgovor = await TrenerService.obrisi(sifra);

            if (odgovor.greska) {
                alert(odgovor.poruka);
            } else {
                dohvatiTrenere(); // Ponovo učitaj listu trenera
            }
        } catch (error) {
            console.error("Greška pri brisanju trenera:", error);
            alert("Došlo je do greške prilikom brisanja trenera.");
        }
    }

    return (
        <>
            <Link to={RouteNames.TRENER_NOVI} className="btn btn-success mb-3">
                Dodaj novog trenera
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Iskustvo</th>
                        <th>Klub ID</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {treneri.length > 0 ? (
                        treneri.map((trener, index) => (
                            <tr key={index}>
                                <td>{trener.ime}</td>
                                <td>{trener.prezime}</td>
                                <td>{trener.iskustvo}</td>
                                <td>{trener.klub_id}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/treneri/${trener.sifra}`)}
                                    >
                                        Promjena
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => obrisiTrenera(trener.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                Nema dostupnih trenera.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}

