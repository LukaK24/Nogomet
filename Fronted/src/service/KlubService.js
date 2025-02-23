import { HttppService } from "./HttpService.js";


async function get() {

    return await HttppService.get('/Klub')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}

async function dodaj(klub){
    return HttppService.post('/Klub', klub)
    .then(()=>{return{greska: false, poruka: 'Dodano'}})
    .catch(()=>{return{greska: true, poruka:'Problem kod dodavanja'}})
}

export default{

    get 
}
    
