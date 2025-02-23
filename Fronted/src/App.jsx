import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBarNogomet from './components/NavBarNogomet';
import Container from "react-bootstrap/Container";
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import KluboviPregled from './pages/klubovi/KluboviPregled';
import KluboviDodaj from './pages/klubovi/KluboviDodaj';
import KluboviPromjena from './pages/klubovi/KluboviPromjena';


function App() {
  

  return (
    <>

      <Container>
       <NavBarNogomet />
       
        
      <Routes>
        <Route path={RouteNames.HOME} element = {<Pocetna />} />
        <Route path={RouteNames.KLUB_PREGLED} element={<KluboviPregled />} />
        <Route path={RouteNames.KLUB_NOVI}element={<KluboviDodaj />} />
        <Route path={RouteNames.KLUB_PROMJENA} element={<KluboviPromjena />} />
      </Routes>
       
       

    
       
       <hr />
       &copy; Nogomet 2025
      </Container>
      
    
    </>
  )
}

export default App
