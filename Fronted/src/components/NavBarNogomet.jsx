import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';



export default function NavBarNogomet(){

  const navigate = useNavigate();


    return(
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
        className='ruka'
        onClick={()=>navigate(RouteNames.HOME)}
        >Nogomet APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
      
            <NavDropdown title="Nogomet" id="basic-nav-dropdown">
              <NavDropdown.Item
              onClick={()=>navigate(RouteNames.KLUB_PREGLED)}
              >Klubovi</NavDropdown.Item>

                    <NavDropdown.Item
                    onClick={()=>navigate(RouteNames.TRENER_PREGLED)}
                    >Treneri</NavDropdown.Item>

                    <NavDropdown.Item
                    onClick={()=>navigate(RouteNames.UTAKMICE_PREGLED)}
                    >Utakmice</NavDropdown.Item>

                    <NavDropdown.Item
                    onClick={()=>navigate(RouteNames.IGRACI_PREGLED)}
                    >Utakmice</NavDropdown.Item>
           
            </NavDropdown>
            <Nav.Link href="https://luka222-001-site1.mtempurl.com/swagger/index.html" target='_blank'>Swagger</Nav.Link>
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

     </>

    )
}


   
