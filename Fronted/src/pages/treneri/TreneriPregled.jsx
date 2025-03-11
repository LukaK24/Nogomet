import { useEffect, useState } from "react";
import TrenerService from "../../service/TrenerService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function TreneriPregled() {
    const [treneri, setTreneri] = useState();
    const navigate = useNavigate();

    async function dohvatiTrenere() {
        const odgovor = await TrenerService.get();
        setTreneri(odgovor);
    }

    useEffect(() => {
        dohvatiTrenere();
    }, []);

    function obrisi(sifra) {
        if (!confirm("Sigurno obrisati")) {
            return;
        }
        brisanjeTrenera(sifra);
    }

    async function brisanjeTrenera(sifra) {
        const odgovor = await TrenerService.obrisi(sifra);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiTrenere();
    }

    return (
        <>
            <Link to={RouteNames.TRENER_NOVI} className="btn btn-success siroko">
                Dodaj novog trenera
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Iskustvo</th>
                        <th>klub_id</th>
                    </tr>
                </thead>
                <tbody>
                    {treneri &&
                        treneri.map((trener, index) => (
                            <tr key={index}>
                                <td>{trener.ime}</td>
                                <td>{trener.prezime}</td>
                                <td>{trener.klub_id}</td>
                                <td>{trener.iskustvo}</td>
                                <td>
                                    <Button onClick={() => navigate(`/treneri/${trener.sifra}`)}>
                                        Promjena
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="danger" onClick={() => obrisi(trener.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}
