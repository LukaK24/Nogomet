import HttpService from './HttpService'; // Provjeri ispravan import

const IgraciService = {
    // Dohvati sve igrače
    async dohvatiIgrace() {
        try {
            const response = await HttpService.get('/Igraci');  // Provjeri ispravnu putanju
            return response.data;  // Pretpostavljamo da odgovor dolazi u formatu { data: [...] }
        } catch (error) {
            console.error('Greška pri dohvaćanju igrača:', error);
            throw error;  // Ponovno bacimo grešku kako bi je mogli obraditi na višoj razini
        }
    },

    // Dohvati jednog igrača prema šifri
    async getBySifra(sifra) {
        try {
            const response = await HttpService.get(`/Igraci/${sifra}`);  // Ispravna putanja
            return response.data;
        } catch (error) {
            console.error('Greška pri dohvaćanju igrača po šifri:', error);
            throw error;
        }
    },

    // Dodaj novog igrača
    async dodaj(igrac) {
        try {
            await HttpService.post('/igraci', igrac);  // Ispravna putanja
            return { greska: false, poruka: 'Dodano' };
        } catch (error) {
            console.error('Greška pri dodavanju igrača:', error);
            return { greska: true, poruka: 'Problem kod dodavanja' };
        }
    },

    // Promijeni podatke postojećeg igrača
    async promjena(sifra, igrac) {
        try {
            await HttpService.put(`/Igraci/${sifra}`, igrac);  // Ispravna putanja
            return { greska: false, poruka: 'Promijenjeno' };
        } catch (error) {
            console.error('Greška pri promjeni podataka igrača:', error);
            return { greska: true, poruka: 'Problem kod promjene' };
        }
    },

    // Obriši igrača prema šifri
    async obrisi(sifra) {
        try {
            await HttpService.delete(`/Igraci/${sifra}`);  // Ispravna putanja
            return { greska: false, poruka: 'Obrisano' };
        } catch (error) {
            console.error('Greška pri brisanju igrača:', error);
            return { greska: true, poruka: 'Problem kod brisanja' };
        }
    }
};

export default IgraciService;
