import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import UtakmicaService from "../../service/UtakmiceService"
import { useEffect, useState } from "react";

export default function UtakmicePromjena(){

    const navigate = useNavigate();
    const [utakmice,setUtakmice] = useState({});
    const routeParams = useParams();

    async function dohvatiUtakmicu(){
        const odgovor = await UtakmicaService.getBySifra(routeParams.sifra)
        setUtakmica(odgovor)
    }

    useEffect(()=>{
        dohvatiUtakmicu();
    },[])

    async function promjena(utakmica){
        const odgovor = await UtakmicaService.promjena(routeParams.sifra, utakmica);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.UTAKMICA_PREGLED)
    }

    function odradiSubmit(e){ 
        e.preventDefault(); 

        let podaci = new FormData(e.target);

        promjena(
            {
                datum: podaci.get('datum'),
                domaci_klub: podaci.get('domaci_klub'),
                gostujuci_klub: podaci.get('gostujuci_klub')
            }
        );
    }

    return(
    <>
    Promjena utakmice
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="datum">
            <Form.Label>Datum</Form.Label>
            <Form.Control type="datetime-local" name="datum" required defaultValue={utakmica.datum} />
        </Form.Group>

        <Form.Group controlId="domaci_klub">
            <Form.Label>Domaći klub</Form.Label>
            <Form.Control type="text" name="domaci_klub" required defaultValue={utakmica.domaci_klub} />
        </Form.Group>

        <Form.Group controlId="gostujuci_klub">
            <Form.Label>Gostujući klub</Form.Label>
            <Form.Control type="text" name="gostujuci_klub" required defaultValue={utakmica.gostujuci_klub} />
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
                    Promjeni utakmicu
                </Button>
            </Col>
        </Row>
    </Form>
    </>
    )
}
