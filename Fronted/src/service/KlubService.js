import { HttppService } from "./HttpService";



async function get() {

    return await HttppService.get('/Klub')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}
async function getBySifra(sifra) {

    return await HttppService.get('/Klub/' + sifra)
    .then((odgovor)=>{
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(klub){
    return HttppService.post('/Klub',klub)
    .then(()=>{return{greska: false, poruka: 'Dodano'}})
    .catch(()=>{return{greska: true, poruka:'Problem kod dodavanja'}})
}
async function promijena(sifra,klub) {
    return HttppService.put('/Klub/'+sifra,klub)
    .then(()=>{return {greska:false, poruka:'Promjenjeno'}})
    .catch(()=>{return {greska: true, poruka: 'Problem kod promjene'}})
    
}
async function obrisi(sifra,klub){
    return HttppService.delete('/Klub/'+sifra)
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
