import { HttppService } from "./HttpServicejs";


async function get() {

    return await HttppService.get('/Klub')
    .then((odgovor)=>{
        //console.table(odgovor.data)
        return odgovor.data;
    })
    .catch((e)=>{})
}


export default{

    get 
}
    
