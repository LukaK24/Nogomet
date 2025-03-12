using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Klub: Entitet
    {
        public string Naziv { get; set; } = "";
        public int Osnovan { get; set; }
        public string Stadion { get; set; } = "";
        public string Drzava { get; set; } = "";
        public string Liga { get; set; } = "";
    }
}
