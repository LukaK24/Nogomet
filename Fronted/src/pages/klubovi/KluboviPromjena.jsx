import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import KlubService from "../../service/KlubService"
import { useEffect, useState } from "react";


export default function KluboviPromjena(){

     const navigate = useNavigate();
     const [klub,setklub] = useState({});
     const routeParams = useParams();

     async function dohvatiklub(){
        const  odgovor = await KlubService.getBySifra(routeParams.sifra)
        setklub(odgovor)
     }

     useEffect(() =>{
        dohvatiklub();
     },[])

    async function dodaj(klub){
      const odgovor=KlubService.dodaj(klub);
      if(odgovor.greska){
        alert(odgovor.poruka)
        return
      }
      
      //navigate(RouteNames.KLUB_PREGLED)

    }
   

    
    
     async function odradiSubmit(e) {
        e.preventDefault(); // Sprječava standardni submit ponašanje
    
        if (!klub.sifra) {
            alert("Greška: Klub nije ispravno učitan!");
            return;
        }
    
        let podaci = new FormData(e.target);
    
        let noviPodaci = {
            naziv: podaci.get('naziv'),
            osnovan: parseInt(podaci.get('osnovan')),
            stadion: podaci.get('stadion'),
            drzava: podaci.get('drzava'),
            liga: podaci.get('liga')
        };
    
        console.log("Podaci za ažuriranje:", noviPodaci); // Debugging
    
        // POZIVAMO KlubService.promjena umjesto nepostojeće 'promijena' funkcije
        let odgovor = await KlubService.promijena(klub.sifra, noviPodaci);
    
        if (odgovor.greska) {
            alert(odgovor.poruka);
        } else {
            alert("Klub uspješno promijenjen!");
            navigate(RouteNames.KLUB_PREGLED); // Navigiraj nazad na pregled klubova
        }
    }
        
    

   
        
        
        
    


    return(
        <>  
        Dodavanje klubova
        <Form onSubmit={odradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required
                defaultValue={klub.naziv}/>

            </Form.Group>

            <Form.Group controlId="osnovan">
                <Form.Label>Osnovan</Form.Label>
                <Form.Control type="number" name="osnovan" required
                defaultValue={klub.osnovan}/>

            </Form.Group>

            <Form.Group controlId="stadion">
                <Form.Label>Stadion</Form.Label>
                <Form.Control type="text" name="stadion" required
                defaultValue={klub.stadion}/>

            </Form.Group>

            <Form.Group controlId="drzava">
                <Form.Label>Država</Form.Label>
                <Form.Control type="text" name="drzava" required
                defaultValue={klub.drzava}/>

            </Form.Group>

            <Form.Group controlId="liga">
                <Form.Label>Liga</Form.Label>
                <Form.Control type="text" name="liga" required
                defaultValue={klub.liga}/>

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