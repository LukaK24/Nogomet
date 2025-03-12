import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { RouteNames } from '../../constants';
import IgraciService from '../../service/IgraciService';

export default function IgraciPromjena() {
    const { sifra } = useParams();  // Uzimamo 'sifra' iz URL parametara
    const [igrac, setIgrac] = useState({});
    const navigate = useNavigate();

    // Dohvati igrača prema 'sifra' i postavi podatke u state
    useEffect(() => {
        const fetchIgrac = async () => {
            try {
                const response = await IgraciService.getBySifra(sifra);
                setIgrac(response);  // Postavljamo podatke igrača u state
            } catch (error) {
                console.error('Greška pri dohvaćanju igrača:', error);
            }
        };

        fetchIgrac();
    }, [sifra]);  // Efekt se pokreće kad se sifra promijeni

    // Funkcija za slanje podataka forme na backend
    async function odradiSubmit(e) {
        e.preventDefault();  // Sprječavamo defaultno ponašanje forme (refresh stranice)

        const podaci = new FormData(e.target);  // Uzimamo podatke iz forme

        const igracPodaci = {
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            pozicija: podaci.get('pozicija'),
            klub_id: podaci.get('klub_id'),
            oib: podaci.get('oib'),
        };

        try {
            const odgovor = await IgraciService.promjena(sifra, igracPodaci);  // Pozivamo funkciju za promjenu
            if (odgovor.greska) {
                alert(odgovor.poruka);  // Ako dođe do greške, ispisujemo poruku
                return;
            }
            navigate(RouteNames.IGRACI_PREGLED);  // Preusmjeravamo na pregled igrača nakon uspješne promjene
        } catch (error) {
            console.error('Greška pri slanju podataka:', error);
            alert('Došlo je do greške pri slanju podataka');
        }
    }

    return (
        <>
            <h3>Promjena igrača</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                        required
                        defaultValue={igrac.ime || ''}
                    />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                        required
                        defaultValue={igrac.prezime || ''}
                    />
                </Form.Group>

                <Form.Group controlId="pozicija">
                    <Form.Label>Pozicija</Form.Label>
                    <Form.Control
                        type="text"
                        name="pozicija"
                        required
                        defaultValue={igrac.pozicija || ''}
                    />
                </Form.Group>

                <Form.Group controlId="klub_id">
                    <Form.Label>Klub_id</Form.Label>
                    <Form.Control
                        type="text"
                        name="klub_id"
                        required
                        defaultValue={igrac.klub_id || ''}
                    />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control
                        type="text"
                        name="oib"
                        defaultValue={igrac.oib || ''}
                    />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                        <Button
                            variant="danger"
                            onClick={() => navigate(RouteNames.IGRACI_PREGLED)}
                            className="siroko"
                        >
                            Odustani
                        </Button>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Promjeni igrača
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
