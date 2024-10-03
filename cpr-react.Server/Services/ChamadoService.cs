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
            // Localiza o chamado existente no banco de dados
            Chamado? chamado = dbContext.Set<Chamado>().Find(id);

            if (chamado == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }

            // Atualiza as propriedades do chamado existente
            chamado.Data = updatedChamado.Data; // Exemplo de atualização
            chamado.Hora = updatedChamado.Hora; // Exemplo de atualização
            chamado.Cliente = updatedChamado.Cliente; // Exemplo de atualização
            chamado.Descricao = updatedChamado.Descricao; // Exemplo de atualização
            chamado.Contrato = updatedChamado.Contrato; // Exemplo de atualização
            chamado.Urgencia = updatedChamado.Urgencia; // Exemplo de atualização
            chamado.Status = updatedChamado.Status; // Exemplo de atualização

            // Salva as alterações no banco de dados
            dbContext.SaveChanges();
        }

    }
}
