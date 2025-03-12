using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Igrac : Entitet
    {
        public String Ime { get; set; }= "";
        public String Prezime { get; set; } = "";
        public String Pozicija { get; set; } = "";

        [ForeignKey("klub")]
        public int Klub_id { get; set; }
        public String? Oib { get; set; }
    }
}
