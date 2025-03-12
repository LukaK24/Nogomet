import HttpService from "../service/HttpService";


async function get() {
    return HttpService.get('/Trener')
        .then((odgovor) => odgovor.data)
        .catch((e) => {
            console.error("Greška prilikom dohvatanja trenera:", e);
            return [];
        });
}

async function getBySifra(sifra) {
    return HttpService.get('/Trener/' + sifra)
        .then((odgovor) => odgovor.data)
        .catch((e) => {
            console.error("Greška prilikom dohvatanja trenera po šifri:", e);
            return null;
        });
}

async function dodaj(trener) {
    return HttpService.post('/Trener', trener).then((response) => {
            if (response.status === 201) { 
                return { greska: false, poruka: 'Trener uspješno dodan' };
            } else {
                return { greska: true, poruka: 'Neočekivan odgovor servera' };
            }
        })
        .catch((error) => {
            console.error("Greška pri dodavanju trenera:", error);
            return { greska: true, poruka: 'Problem kod dodavanja trenera' };
        });
}

async function promjena(sifra, trener) { 
    return HttpService.put('/Trener/' + sifra, trener)
        .then(() => ({ greska: false, poruka: 'Promenjeno' }))
        .catch((error) => {
            console.error("Greška pri promeni trenera:", error);
            return { greska: true, poruka: 'Problem kod promene' };
        });
}

async function obrisi(sifra) {
    return HttpService.delete('/Trener/' + sifra)
        .then(() => ({ greska: false, poruka: 'Obrisano' }))
        .catch((error) => {
            console.error("Greška pri brisanju trenera:", error);
            return { greska: true, poruka: 'Problem kod brisanja' };
        });
}

export default {
    get,
    getBySifra,
    dodaj,
    promjena,
    obrisi
};
