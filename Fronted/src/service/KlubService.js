import HttpService from "../service/HttpService";



async function get() {

    return await HttpService.get('/Klub')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}
async function getBySifra(sifra) {

    return await HttpService.get('/Klub/' + sifra)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(klub){
    return HttpService.post('/Klub',klub)
    .then(()=>{return{greska: false, poruka: 'Dodano'}})
    .catch(()=>{return{greska: true, poruka:'Problem kod dodavanja'}})
}
async function promijena(sifra,klub) {
    return HttpService.put('/Klub/'+sifra,klub)
    .then(()=>{return {greska:false, poruka:'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod promjene'}})
    
}
async function obrisi(sifra,klub){
    return HttpService.delete('/Klub/'+sifra)
    .then(()=>{return {greska:false, poruka:'Obrisano'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod brisanja'}})
}
export default{

    get, 
    dodaj,
    getBySifra,
    promijena,
    obrisi
}
