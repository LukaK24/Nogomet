import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import TrenerService from "../../service/TrenerService";
import { useEffect, useState } from "react";

export default function TrenerPromjena() {
    const navigate = useNavigate();
    const [trener, setTrener] = useState({});
    const routeParams = useParams();

    async function dohvatiTrenera() {
        const odgovor = await TrenerService.getBySifra(routeParams.sifra);
        setTrener(odgovor);
    }

    useEffect(() => {
        dohvatiTrenera();
    }, []);

    async function promjena(trener) {
        const odgovor = await TrenerService.promjena(routeParams.sifra, trener);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.TRENERI_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            iskustvo: podaci.get('iskustvo'),
            klub_id: podaci.get('klub_id')
        });
    }

    return (
        <>
            <h2>Promjena Trenera</h2>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={trener.ime} />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required defaultValue={trener.prezime} />
                </Form.Group>

                <Form.Group controlId="klub_id">
                    <Form.Label>Klub ID</Form.Label>
                    <Form.Control type="text" name="klub_id" required defaultValue={trener.klub_id} />
                </Form.Group>

                <Form.Group controlId="iskustvo">
                    <Form.Label>Iskustvo</Form.Label>
                    <Form.Control type="text" name="iskustvo" required defaultValue={trener.iskustvo} />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6}>
                    <Button 
    variant="danger" 
    className="siroko" 
    type="button" // Važno: Sprečava podrazumijevani submit!
    onClick={() => {
        console.log("Kliknuto Odustani, navigacija na", RouteNames.TRENER_PREGLED);
        navigate(RouteNames.TRENER_PREGLED);
    }}
>
    Odustani
                        </Button>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Promjeni Trenera
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}