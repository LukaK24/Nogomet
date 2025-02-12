using Backend.Controllers;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {

        }


        public DbSet<Klub> Klubovi { get; set; }

       
    }    }
