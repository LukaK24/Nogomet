import HttpService from "./HttpService";

async function get(){
    return await HttpService.get('/utakmice')  // <- Promijenjeno iz '/Utakmica' u '/Utakmice'
    .then((odgovor)=> odgovor.data)
    .catch(() => null);
}

async function getBySifra(sifra){
    return await HttpService.get('/utakmice/' + sifra) // <- Množina
    .then((odgovor)=> odgovor.data)
    .catch(() => null);
}

async function dodaj(Utakmica){
    return HttpService.post('/utakmice', Utakmica)  // <- Množina
    .then(() => ({greska: false, poruka: 'Dodano'}))
    .catch(() => ({greska: true, poruka: 'Problem kod dodavanja'}));
}

async function promjena(sifra, Utakmica){
    return HttpService.put('/utakmice/'+sifra, Utakmica) // <- Množina
    .then(() => ({greska: false, poruka: 'Promijenjeno'}))
    .catch(() => ({greska: true, poruka: 'Problem kod promjene'}));
}

async function obrisi(sifra){
    return HttpService.delete('/utakmice/'+sifra) // <- Množina
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
