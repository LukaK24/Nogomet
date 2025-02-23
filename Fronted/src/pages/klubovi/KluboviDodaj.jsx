import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KluboviDodaj(){

    function odradiSubmit(e){ //e je event
        e.preventDefault(); //nemoj odraditi zahtje na server po standradnom načinu
        let podaci =new FormData(e.traget);

        console.log(JSON.stringify(
            
            {
                naziv: podaci.get('naziv'),
                osnovan: podaci.get('osnovan'),
                stadion: podaci.get('stadion'),
                drzava: podaci.get('drzava'),
                liga: podaci.get('liga')
            }
              
        ));
    }


    return(
        <>  
        Dodavanje klubova
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="Naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="Naziv" required/>

            </Form.Group>

            <Form.Group controlId="Osnovan">
                <Form.Label>Osnovan</Form.Label>
                <Form.Control type="number" name="cijena" required/>

            </Form.Group>

            <Form.Group controlId="Stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="Stadion" required/>

            </Form.Group>

            <Form.Group controlId="Država">
                <Form.Label>Država</Form.Label>
                <Form.Control type="text" name="Drzava" required/>

            </Form.Group>

            <Form.Group controlId="Liga">
                <Form.Label>Liga</Form.Label>
                <Form.Control type="text" name="Liga" required/>

            </Form.Group>

            <hr/>

            
            <Row>
            <Col xs={6} sm={6} md={6} lg={2} xl={6} xxl={6}>
            <Link
            to={RouteNames.KLUB_PREGLED}
            className="btn btn-danger siroko"
            >Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={6} lg={6} xl={6} xxl={6} >
            <Button variant="success" type="submit" className="siroko">
                Dodaj klub
            </Button>
           
            </Col>
        </Row>
        


        </Form>




        
        </>
    )
}