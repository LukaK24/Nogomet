using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Controller
{
    public class Trener
    {
        [Key]  // Označava primarni ključ
        [Column("sifra")]  // Mapira na postojeći stupac 'sifra' u bazi
        public int Sifra { get; set; }

        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";

        [ForeignKey("Klub")]
        public int Klub_id { get; set; }

        public int Iskustvo { get; set; }

    }
}