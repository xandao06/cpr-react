using cpr_react.Server.Persistence;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Services
{
    public class ChamadoService
    {

        private readonly CPRDbContext dbContext;

        public ChamadoService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IReadOnlyList<Chamado> GetAll()
        {
            return dbContext.Chamados.ToList();
        }

        public void Add(Chamado chamado)
        {
            dbContext.Chamados.Add(chamado);
            dbContext.SaveChanges();
        }

    }
}
