import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import TrenerService from "../../service/TrenerService";

export default function TreneriDodaj() {
    const navigate = useNavigate();

    async function dodaj(trener) {
        const odgovor = await TrenerService.dodaj(trener);
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RouteNames.TRENERI_PREGLED);
    }

    async function odradiSubmit(e) { 
        e.preventDefault(); 
        console.log("✔ Dugme 'Dodaj trenera' je kliknuto!");

        let podaci = new FormData(e.target);
        let noviTrener={
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            iskustvo: podaci.get('iskustvo'),
            klub_id: podaci.get('klub_id')
        

        }
        console.log("📌 Podaci iz forme:", noviTrener);
       
        try {
            const odgovor = await TrenerService.dodaj(noviTrener);
            console.log("📌 Odgovor servera:", odgovor);
    
            if (odgovor?.greska) {
                alert("❌ Greška: " + odgovor.poruka);
                return;
            }
    
            alert("✅ Trener uspješno dodat!");
            navigate("/treneri"); 
        } catch (error) {
            console.error("❌ Greška pri dodavanju trenera:", error);
            alert("Nešto nije u redu sa dodavanjem trenera!");
        }
    }

    return (
        <>
            Dodavanje trenera
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>


                <Form.Group controlId="iskustvo">
                    <Form.Label>Iskustvo</Form.Label>
                    <Form.Control type="number" name="iskustvo" required />
                </Form.Group>

                <Form.Group controlId="klub_id">
                    <Form.Label>Klub ID</Form.Label>
                    <Form.Control type="number" name="klub_id" required />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                    <Link to="/treneri" className="btn btn-danger siroko">
                    Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                        <Button variant="success" type="submit" className="siroko">
                            Dodaj trenera
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}