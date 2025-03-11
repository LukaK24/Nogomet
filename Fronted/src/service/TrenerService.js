import { HttppService } from "./HttpService";


async function get() {
    return HttpService.get('/Trener')
    .then((odgovor) => {
        return odgovor.data;
    })
    .catch((e) => {});
}

async function getBySifra(sifra) {
    return HttpService.get('/Trener/' + sifra)
    .then((odgovor) => {
        return odgovor.data;
    })
    .catch((e) => {});
}

async function dodaj(Trener) {
    return HttpService.post('/Trener', Trener)
    .then(() => { return { greska: false, poruka: 'Dodano' }; })
    .catch(() => { return { greska: true, poruka: 'Problem kod dodavanja' }; });
}

async function promjena(sifra, Trener) {
    return HttpService.put('/Trener/' + sifra, Trener)
    .then(() => { return { greska: false, poruka: 'Promenjeno' }; })
    .catch(() => { return { greska: true, poruka: 'Problem kod promene' }; });
}

async function obrisi(sifra) {
    return HttpService.delete('/Trener/' + sifra)
    .then(() => { return { greska: false, poruka: 'Obrisano' }; })
    .catch(() => { return { greska: true, poruka: 'Problem kod brisanja' }; });
}

export default {
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
};