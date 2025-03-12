using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KlubController : ControllerBase
    {
        private readonly BackendContext _context;

        public KlubController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetKlubovi()
        {
            try
            {
                return Ok(_context.Klubovi);
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
                var n = _context.Klubovi.Find(sifra);
                if (n == null)
                {
                    return NotFound();
                }
                return Ok(n);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // ... existing code ...

        [HttpPost]
        public IActionResult Post(Klub klub) // Use the Klub type from Backend.Models
        {
            try
            {
                var entityEntry = _context.Klubovi.Add(klub);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, klub);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Klub klub)
        {
            try
            {
                var n = _context.Klubovi.Find(sifra);
                if (n == null)
                {
                    return NotFound();
                }

                n.Naziv = klub.Naziv;
                n.Osnovan = klub.Osnovan;
                n.Stadion = klub.Stadion;
                n.Drzava = klub.Drzava;
                n.Liga = klub.Liga;

                _context.Klubovi.Update(n);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var n = _context.Klubovi.Find(sifra);
                if (n == null)
                {
                    return NotFound();
                }
                _context.Klubovi.Remove(n);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
   
}
