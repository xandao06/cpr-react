using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace cpr_react.Server.Persistence
{
    public class CPRDbContext : DbContext
    {
        public CPRDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CPRDbContext).Assembly);
        }

        public DbSet<Chamado> Chamados { get; set; }
    }
}
