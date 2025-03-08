import React from 'react';

const Pocetna = () => {
  // Definiramo stilove s pozadinskom slikom
  const containerStyle = {
    backgroundImage: 'url("/radnapozadina/slike")',  // Putanja do slike u public folderu
    backgroundSize: 'cover',   // Slika će pokriti cijeli ekran
    backgroundPosition: 'center',  // Slika će biti centrirana
    height: '100vh',            // Visina cijelog ekrana
    display: 'flex',            // Flexbox za centriranje sadržaja
    justifyContent: 'center',  // Centriranje horizontalno
    alignItems: 'center',      // Centriranje vertikalno
    color: '#fff',             // Boja teksta
  };

  return (
    <div style={containerStyle}>
      <h1>Dobrodošli na početnu stranicu!</h1>
    </div>
  );
};

export default Pocetna;
