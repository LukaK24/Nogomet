import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import TrenerService from "../../service/TrenerService";
import { useEffect, useState } from "react";


export default function TreneriPromjena(){

    const navigate = useNavigate();
    const [trener,setTrener] = useState({});
    const routeParams = useParams();

    async function dohvatiTrenere(){
        const odgovor = await TrenerService.getBySifra(routeParams.sifra)

        setTrener(odgovor)
    }

    useEffect(()=>{
        dohvatiTrenere();
    },[])

    async function promjena(trener){
        const odgovor = await TrenerService.promjena(routeParams.sifra,trener);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.TRENERI_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
            {
                ime: podaci.get('ime'),
                prezime: podaci.get('prezime'),
                iskustvo: podaci.get('iskustvo'),
                klub_id: podaci.get('klub_id')
            }
        );
    }

    return(
    <>
    Promjena trenera
    <Form onSubmit={odradiSubmit}>

    <Form.Group controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" required defaultValue={trener.ime}  />
        </Form.Group>

        <Form.Group controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" required defaultValue={trener.prezime}  />
        </Form.Group>

        <Form.Group controlId="klub_id">
            <Form.Label>Klub ID</Form.Label>
            <Form.Control type="text" name="klub_id" required defaultValue={trener.klub_id}  />
        </Form.Group>

        <Form.Group controlId="iskustvo">
            <Form.Label>Iskustvo</Form.Label>
            <Form.Control type="text" name="iskustvo" required defaultValue={trener.iskustvo}  />
        </Form.Group>

    
        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.TRENERI_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Promjeni trenera
                </Button>
            </Col>
        </Row>

    </Form>
    </>
    )
}