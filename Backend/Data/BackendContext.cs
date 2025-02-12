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
        public DbSet<Klub> Klub { get; set; } // Provjeri da ime odgovara bazi

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Klub>().ToTable("Klub");
        }
    }    }
