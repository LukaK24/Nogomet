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
import TreneriPregled from './pages/treneri/TreneriPregled';
import TreneriDodaj from './pages/treneri/TreneriDodaj';
import TreneriPromjena from './pages/treneri/TreneriPromjena';
import UtakmicePregled from './pages/utakmice/UtakmicePregled';
import UtakmiceDodaj from './pages/utakmice/UtakmiceDodaj';
import UtakmicePromjena from './pages/utakmice/UtakmicePromjena';


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
      
       
      
        <Route path={RouteNames.TRENER_PREGLED} element={<TreneriPregled />} />
       <Route path={RouteNames.TRENER_NOVI} element={<TreneriDodaj />} />
       <Route path={RouteNames.TRENER_PROMJENA} element={<TreneriPromjena />} />
      

          <Route path={RouteNames.UTAKMICE_PREGLED} element={<UtakmicePregled />} />
          <Route path={RouteNames.UTAKMICE_NOVI} element={<UtakmiceDodaj />} />
          <Route path={RouteNames.UTAKMICE_PROMJENA} element={<UtakmicePromjena />} />
          </Routes>
    
       
       <hr />
       &copy; Nogomet 2025
      </Container>
      
    
    </>
  )
}

export default App
