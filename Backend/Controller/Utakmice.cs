using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UtakmiceController : ControllerBase
    {
        private readonly BackendContext _context;

        public UtakmiceController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Utakmice);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Utakmice.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public IActionResult Post(Utakmice utakmice)
        {
            try
            {
                _context.Utakmice.Add(utakmice);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, utakmice);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Utakmica utakmica)
        {
            try
            {

                var s = _context.Utakmice.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Datum = utakmica.Datum;
                s.Domaci_klub = utakmica.Domaci_klub;
                s.Gostujuci_klub = utakmica.Gostujuci_klub;
                

                _context.Utakmice.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Utakmice.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Utakmice.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }

    public class Utakmica
    {
        public DateTime? Datum { get; internal set; }
        public int Domaci_klub { get; internal set; }
        public int Gostujuci_klub { get; internal set; }
    }
}
