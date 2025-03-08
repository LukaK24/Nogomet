import React from 'react';
import pozadina from '/images/pozadina.jpg'; // Import slike iz public/images



const Pocetna = () => {
  const containerStyle = {
    backgroundImage: `url(${pozadina})`, // Koristimo importiranu sliku
    backgroundSize: 'contain', // Slika će se prilagoditi veličini elementa (neće biti izrezana)
    backgroundPosition: 'center',
    height: '85vh', // Visina elementa
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black', // Postavljanje boje teksta na crnu
    maxWidth: '90%', // Maksimalna širina 90% ekrana
    wordWrap: 'break-word', // Ako je tekst predug, prelomit će se
  };

  const headerStyle = {
    position: 'absolute',   // Koristi apsolutnu poziciju
    top: '5px',            // Pozicioniraj 10px od vrha
    left: '55%',            // Centriraj horizont
    transform: 'translateX(-50%)',  // Centriraj tačno iz sredine
    zIndex: 2,              // Povećaj z-index da bi tekst bio iznad slike
  };




  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Dobrodošli na nogometnu stranicu</h1>
    </div>
  );
};

export default Pocetna;




