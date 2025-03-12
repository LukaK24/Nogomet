import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import UtakmiceService from "../../service/UtakmiceService";

export default function UtakmiceDodaj() {
    const navigate = useNavigate();

    async function dodaj(utakmica) {
        try {
            console.log("📤 Šaljem podatke na API:", JSON.stringify(utakmice));

            const odgovor = await UtakmiceService.dodaj(utakmice);
            console.log("📥 API odgovor:", odgovor);

            if (!odgovor || odgovor.greska) {
                alert(odgovor?.poruka || "❌ Došlo je do greške pri dodavanju.");
                return;
            }

            alert("✅ Utakmica uspešno dodana!");
            navigate(RouteNames.UTAKMICA_PREGLED);
        } catch (error) {
            console.error("❌ Greška pri dodavanju utakmice:", error);
            alert("Došlo je do greške pri dodavanju utakmice.");
        }
    }

    function odradiSubmit(e) {
        e.preventDefault();
        alert("✅ Forma je poslata!");  
        console.log("✅ Kliknuto na dugme 'Dodaj utakmicu'!");

        const formData = new FormData(e.target); 
        const utakmice = {
            datum: formData.get('datum'),
            domaci_klub: parseInt(formData.get('domaci_klub')), 
            gostujuci_klub: parseInt(formData.get('gostujuci_klub'))
        };
    
        console.log("📤 Šaljem utakmicu na API:", utakmica);
    
        dodaj(utakmice);
        console.log("📋 Podaci iz forme:", Object.fromEntries(formData));
    
        dodaj({
            datum: formData.get('datum'),
            domaci_klub: parseInt(formData.get('domaci_klub')),
            gostujuci_klub: parseInt(formData.get('gostujuci_klub'))
        });
        console.log("✅ Forma je submitovana!");

        let podaci = new FormData(e.target);
        let utakmica = {
            datum: podaci.get("datum"),
            domaci_klub: parseInt(podaci.get("domaci_klub")),
            gostujuci_klub: parseInt(podaci.get("gostujuci_klub"))
        };

        console.log("📋 Podaci iz forme:", utakmica);

        if (!utakmica.datum || isNaN(utakmica.domaci_klub) || isNaN(utakmica.gostujuci_klub)) {
            alert("⚠️ Sva polja su obavezna!");
            return;
        }

        dodaj(utakmica);
    }

    return (
        <>
            <h2>Dodavanje utakmice</h2>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="datum">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control type="datetime-local" name="datum" required />
                </Form.Group>

                <Form.Group controlId="domaci_klub">
                    <Form.Label>Domaći klub</Form.Label>
                    <Form.Control type="number" name="domaci_klub" required />
                </Form.Group>

                <Form.Group controlId="gostujuci_klub">
                    <Form.Label>Gostujući klub</Form.Label>
                    <Form.Control type="number" name="gostujuci_klub" required />
                </Form.Group>

                <hr />

                <Row>
                    <Col xs={6}>
                        <Link to={RouteNames.UTAKMICA_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit">
                            Dodaj utakmicu
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
