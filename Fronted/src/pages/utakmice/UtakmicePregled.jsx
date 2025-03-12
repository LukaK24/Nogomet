import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import UtakmiceService from "../../service/UtakmiceService"; // ✅ PROVERI PUTANJU
import { RouteNames } from "../../constants";
import moment from "moment";


export default function UtakmicePregled() {
    const [utakmice, setUtakmice] = useState([]);
    const navigate = useNavigate();

    async function dohvatiUtakmice() {
        try {
            const odgovor = await UtakmiceService.get();
            console.log("📢 API Response:", odgovor);

            if (!Array.isArray(odgovor)) {
                console.error("❌ API nije vratio niz! Dobijeno:", odgovor);
                setUtakmice([]);
                return;
            }

            setUtakmice(odgovor);
        } catch (error) {
            console.error("❌ Greška kod dohvata utakmica:", error);
            setUtakmice([]);
        }
    }

    useEffect(() => {
        dohvatiUtakmice();
    }, []);

    function obrisi(sifra) {
        if (!confirm("Sigurno obrisati?")) return;
        brisanjeUtakmice(sifra);
    }

    async function brisanjeUtakmice(sifra) {
        const odgovor = await UtakmiceService.obrisi(sifra); // ✅ ISPRAVKA
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiUtakmice();
    }

    return (
        <>
            <Link to={RouteNames.UTAKMICA_NOVA} className="btn btn-success siroko">
                Dodaj novu utakmicu
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Domaći klub</th>
                        <th>Gostujući klub</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {utakmice.length > 0 ? (
                        utakmice.map((utakmica, index) => (
                            <tr key={index}>
                                <td>{moment(utakmica.datum).format("DD.MM.YYYY HH:mm")}</td>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nema utakmica</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
