using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Utakmice : Entitet
    {
        internal object datum;

        public DateTime? Datum { get; set; }

        [ForeignKey("klub")]
        public int Domaci_klub { get; set; }

        [ForeignKey("klub")]
        public int Gostujuci_klub { get; set; }
    }
}
