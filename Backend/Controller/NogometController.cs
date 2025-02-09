using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NogometController : ControllerBase
    {
        private readonly BackendContext _context;

        public NogometController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Nogometi);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        private IActionResult Ok(object nogometi)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var n = _context.Nogometi.Find(sifra); 
                if (n == null)
                {
                    return NotFound();
                }
                return Ok(n);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public IActionResult Post(Nogomet nogomet)
        {
            try
            {
                _context.Nogometi.Add(nogomet);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, nogomet);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Nogomet nogomet)
        {
            try
            {
                var n = _context.Nogometi.Find(sifra); 
                if (n == null)
                {
                    return NotFound();
                }

                n.Naziv = nogomet.Naziv;
                n.Osnovan = nogomet.Osnovan;
                n.Stadion = nogomet.Stadion;
                n.Drzava = nogomet.Drzava;
                n.Liga = nogomet.Liga;

                _context.Nogometi.Update(n);
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
                var n = _context.Nogometi.Find(sifra); 
                if (n == null)
                {
                    return NotFound();
                }
                _context.Nogometi.Remove(n);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
    public class BackendContext : DbContext
    {
        public DbSet<Nogomet> Nogometi { get; set; }
    }
}
