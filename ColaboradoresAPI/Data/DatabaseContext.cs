using ColaboradoresAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColaboradoresAPI.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<Usuarios> Usuario { get; set; }
        public DbSet<Colaboradores> Colaboradores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Colaboradores>().ToTable("Colaboradores");
            modelBuilder.Entity<Usuarios>().ToTable("Usuario");
        }
    }
}
