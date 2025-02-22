import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KluboviDodaj(){


    return(
        <>  
        Dodavanje klubova
        <Row>
            <Col>
            <Link
            to={RouteNames.KLUB_PREGLED}
            className="btn btn-danger siroko"
            >Odustani</Link>
            </Col>
        </Row>
        </>
    )
}