using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;


namespace Backend.Controller
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class IgraciController : ControllerBase
    {
        private readonly BackendContext _context;

        public IgraciController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Igraci);
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
                var s = _context.Igraci.Find(sifra);
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
        public IActionResult Post(Igrac igrac)
        {
            try
            {
                _context.Igraci.Add(igrac);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, igrac);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Igrac igraci)
        {
            try
            {

                var s = _context.Igraci.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                // Rucno mapiranje, kasnije automapper
                s.Ime = igraci.Ime;
                s.Prezime = igraci.Prezime;
                s.Pozicija = igraci.Pozicija;
                s.Klub_id = igraci.Klub_id;
                s.Oib = igraci.Oib;

                _context.Igraci.Update(s);
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
                var s = _context.Igraci.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Igraci.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

    }
}
