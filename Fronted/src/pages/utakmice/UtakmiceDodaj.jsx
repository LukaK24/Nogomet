import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import UtakmiceService from "../../service/UtakmiceService"


export default function UtakmiceDodaj(){

    const navigate = useNavigate();

    async function dodaj(utakmica){
        const odgovor = await UtakmicaService.dodaj(utakmica);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.UTAKMICA_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        dodaj(
            {
                datum: podaci.get('datum'),
                domaci_klub: parseInt(podaci.get('domaci_klub')), // int vrijednost
                gostujuci_klub: parseInt(podaci.get('gostujuci_klub')) // int vrijednost
            }
        );
    }

    return(
    <>
    Dodavanje utakmice
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

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.UTAKMICA_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Dodaj utakmicu
                </Button>
            </Col>
        </Row>

    </Form>

    </>
    )}
