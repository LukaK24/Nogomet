﻿using Backend.Controllers;
using Backend.Models;
using Backend.Controllers;
using Microsoft.EntityFrameworkCore;
using Backend.Controller;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {

        }


        public DbSet<Klub> Klubovi { get; set; }

        public DbSet<Trener> Treneri { get; set; }

    }    }
       
     

  
