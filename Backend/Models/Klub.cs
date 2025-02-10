namespace Backend.Models
{
    public class Klub: Entitet
    {
        public string Naziv { get; set; } = "";
        public DateTime? Osnovan { get; set; }
        public string Stadion { get; set; } = "";
        public string Drzava { get; set; } = "";
        public string Liga { get; set; } = "";
    }
}
