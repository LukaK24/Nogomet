import HttpService from "./HttpService";

async function get(){
    return await HttpService.get('/Utakmice')  // <- Promijenjeno iz '/Utakmica' u '/Utakmice'
    .then((odgovor)=> odgovor.data)
    .catch(() => null);
}

async function getBySifra(sifra){
    return await HttpService.get('/Utakmice/' + sifra) // <- Množina
    .then((odgovor)=> odgovor.data)
    .catch(() => null);
}

async function dodaj(Utakmica){
    return HttpService.post('/Utakmice', Utakmica)  // <- Množina
    .then(() => ({greska: false, poruka: 'Dodano'}))
    .catch(() => ({greska: true, poruka: 'Problem kod dodavanja'}));
}

async function promjena(sifra, Utakmica){
    return HttpService.put('/Utakmice/'+sifra, Utakmica) // <- Množina
    .then(() => ({greska: false, poruka: 'Promijenjeno'}))
    .catch(() => ({greska: true, poruka: 'Problem kod promjene'}));
}

async function obrisi(sifra){
    return HttpService.delete('/Utakmice/'+sifra) // <- Množina
    .then(() => ({greska: false, poruka: 'Obrisano'}))
    .catch(() => ({greska: true, poruka: 'Problem kod brisanja'}));
}

export default {
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
};
