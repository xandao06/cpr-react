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

        public Chamado? Get(int id)
        {
            return dbContext.Set<Chamado>().Find(id);
        }

        public void Add(Chamado chamado)
        {
            dbContext.Chamados.Add(chamado);
            dbContext.SaveChanges();
        }

        public void Update(int id, Chamado updatedChamado)
        {
            Chamado? chamado = dbContext.Set<Chamado>().Find(id);

            if (chamado == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }

            chamado.Data = updatedChamado.Data; 
            chamado.Hora = updatedChamado.Hora; 
            chamado.Cliente = updatedChamado.Cliente; 
            chamado.Descricao = updatedChamado.Descricao; 
            chamado.Contrato = updatedChamado.Contrato; 
            chamado.Urgencia = updatedChamado.Urgencia; 
            chamado.Status = updatedChamado.Status; 

            dbContext.SaveChanges();
        }


        public void Deletar (int id)
        {

            var chamado = dbContext.Chamados.Find(id);
            if(chamado != null)
            {
                dbContext.Chamados.Remove(chamado);
                dbContext.SaveChanges();
            }
        }

    }
}
