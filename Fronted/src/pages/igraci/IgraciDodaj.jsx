import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import { RouteNames } from "../../constants";
import IgraciService from "../../service/IgraciService";
import { useState, useEffect } from "react";

export default function IgraciDodaj() {
    const navigate = useNavigate();
    const { igracId } = useParams();  // Ako je igracId u URL-u, koristiće se za uređivanje postojećeg igrača
    
    const [igrac, setIgrac] = useState({
        ime: '',
        prezime: '',
        pozicija: '',
        klub_id: '',
        oib: ''
    });

    // Ako uređuješ postojećeg igrača, dohvati podatke
    useEffect(() => {
        if (igracId) {
            const fetchIgrac = async () => {
                try {
                    const odgovor = await IgraciService.getBySifra(igracId);  // Dohvati igrača po sifri
                    setIgrac(odgovor); // Postavi podatke u state
                } catch (error) {
                    console.error('Greška pri dohvaćanju podataka o igraču:', error);
                }
            };

            fetchIgrac();
        }
    }, [igracId]);

    // Funkcija za slanje podataka
    const odradiSubmit = async (e) => {
        e.preventDefault();  // Sprječavamo defaultno ponašanje forme (refresh stranice)
    
        let podaci = new FormData(e.target);  // Uzimamo podatke iz forme
    
        // Kreiraj objekt s podacima
        const igracPodaci = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            pozicija: podaci.get('pozicija'),
            klub_id: podaci.get('klub_id'),
            oib: podaci.get('oib')
        };
    
        try {
            let odgovor;
            if (igracId) {
                odgovor = await IgraciService.promjena(igracId, igracPodaci);  // Ako ima igracId, mijenjamo postojećeg igrača
            } else {
                odgovor = await IgraciService.dodaj(igracPodaci);  // Inače dodajemo novog igrača
            }

            if (odgovor.greska) {
                alert(odgovor.poruka);
            } else {
                alert('Igrač uspješno spremljen');
                navigate(RouteNames.IGRAC_PREGLED); // Preusmjerenje na pregled
            }
        } catch (error) {
            console.error('Greška pri dodavanju/promjeni igrača:', error);
            alert('Došlo je do greške pri dodavanju/promjeni igrača');
        }
    };

    return (
        <>
            <h3>{igracId ? "Uredi igrača" : "Dodaj igrača"}</h3>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="ime" 
                        required 
                        defaultValue={igrac.ime} 
                    />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="prezime" 
                        required 
                        defaultValue={igrac.prezime} 
                    />
                </Form.Group>

                <Form.Group controlId="pozicija">
                    <Form.Label>Pozicija</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="pozicija" 
                        required 
                        defaultValue={igrac.pozicija} 
                    />
                </Form.Group>

                <Form.Group controlId="klub_id">
                    <Form.Label>Klub ID</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="klub_id" 
                        required 
                        defaultValue={igrac.klub_id} 
                    />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="oib" 
                        required 
                        defaultValue={igrac.oib} 
                        pattern="^\d{11}$" 
                        title="OIB mora imati točno 11 brojeva"
                        placeholder="Unesite OIB (11 brojeva)"
                    />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                        <Link
                            to={RouteNames.IGRACI_PREGLED}
                            className="btn btn-danger siroko"
                        >Odustani</Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            {igracId ? "Spremi promjene" : "Dodaj igrača"}
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}
