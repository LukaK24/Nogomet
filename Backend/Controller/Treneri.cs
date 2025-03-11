using Backend.Controller;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class TrenerController : ControllerBase
    {

        private readonly BackendContext _context;

        public TrenerController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Treneri);
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
                var s = _context.Set<Trener>().Find(sifra); // Fix the issue by using Set<Trener>()
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
        public IActionResult Post(Trener trener)
        {
            try
            {
                _context.Treneri.Add(trener);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, trener);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Trener trener)
        {
            try
            {
                var s = _context.Set<Trener>().Find(sifra); // Fix the issue by using Set<Trener>()

                if (s == null)
                {
                    return NotFound();
                }

                s.Ime = trener.Ime;
                s.Prezime = trener.Prezime;
                s.Klub_id = trener.Klub_id;
                s.Iskustvo = trener.Iskustvo;

                _context.Treneri.Update(s);
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
                var s = _context.Set<Trener>().Find(sifra); // Fix the issue by using Set<Trener>()
                if (s == null)
                {
                    return NotFound();
                }
                _context.Treneri.Remove(s);
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
