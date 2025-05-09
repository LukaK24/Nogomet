import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import KlubService from "../../service/KlubService";
import moment from "moment";


export default function Klubovidodaj(){

     const navigate = useNavigate();

    async function dodaj(klub){
      const odgovor= await KlubService.dodaj(klub);
      if(odgovor.greska){
        alert(odgovor.poruka)
        return
      }
      
      navigate(RouteNames.KLUB_PREGLED)

    }
    
    
  
        
    

    function odradiSubmit(e){ //e je event
        e.preventDefault(); //nemoj odraditi zahtje na server po standradnom načinu
        let podaci =new FormData(e.target);

        dodaj(
            
            {
                naziv: podaci.get('naziv'),
                osnovan: parseInt(podaci.get('osnovan')),
                stadion: podaci.get('stadion'),
                drzava: podaci.get('drzava'),
                liga: podaci.get('liga')
            }
              
        );
    }


    return(
        <>  
        Dodavanje klubova
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required/>

            </Form.Group>

            <Form.Group controlId="osnovan">
                <Form.Label>Osnovan</Form.Label>
                <Form.Control type="number" name="osnovan" required/>

            </Form.Group>

            <Form.Group controlId="stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="stadion" required/>

            </Form.Group>

            <Form.Group controlId="drzava">
                <Form.Label>Država</Form.Label>
                <Form.Control type="text" name="drzava" required/>

            </Form.Group>

            <Form.Group controlId="liga">
                <Form.Label>Liga</Form.Label>
                <Form.Control type="text" name="liga" required/>

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