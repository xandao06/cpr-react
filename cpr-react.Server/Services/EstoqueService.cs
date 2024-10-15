using cpr_react.Server.Persistence;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Services
{
    public class EstoqueService
    {

        private readonly CPRDbContext dbContext;

        public EstoqueService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IReadOnlyList<Produto> GetAll()
        {
            return dbContext.Produtos.ToList();
        }

        public Produto? Get(int id)
        {
            return dbContext.Set<Produto>().Find(id);
        }

        public void Add(Produto produto)
        {
            dbContext.Produtos.Add(produto);
            dbContext.SaveChanges();
        }

        //public void Update(int id, Produto updatedChamado)
        //{
        //    // Localiza o chamado existente no banco de dados
        //    Chamado? chamado = dbContext.Set<Chamado>().Find(id);

        //    if (chamado == null)
        //    {
        //        throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
        //    }

        //    // Atualiza as propriedades do chamado existente
        //    chamado.Data = updatedChamado.Data; // Exemplo de atualização
        //    chamado.Hora = updatedChamado.Hora; // Exemplo de atualização
        //    chamado.Cliente = updatedChamado.Cliente; // Exemplo de atualização
        //    chamado.Descricao = updatedChamado.Descricao; // Exemplo de atualização
        //    chamado.Contrato = updatedChamado.Contrato; // Exemplo de atualização
        //    chamado.Urgencia = updatedChamado.Urgencia; // Exemplo de atualização
        //    chamado.Status = updatedChamado.Status; // Exemplo de atualização

        //    // Salva as alterações no banco de dados
        //    dbContext.SaveChanges();
        //}


        public void Deletar (int id)
        {

            var produto = dbContext.Produtos.Find(id);
            if(produto != null)
            {
                dbContext.Produtos.Remove(produto);
                dbContext.SaveChanges();
            }
        }

    }
}
