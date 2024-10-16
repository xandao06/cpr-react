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

        public void UpdateEntrada(int id, Produto updatedProduto)
        {
            // Localiza o chamado existente no banco de dados
            Produto? produto = dbContext.Set<Produto>().Find(id);

            if (produto == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }

            // Atualiza as propriedades do chamado existente
            produto.CodigoSistema = updatedProduto.CodigoSistema; // Exemplo de atualização
            produto.Marca = updatedProduto.Marca; // Exemplo de atualização
            produto.Modelo = updatedProduto.Modelo; // Exemplo de atualização
            produto.Quantidade += updatedProduto.Quantidade; // Exemplo de atualização
            produto.PrecoCusto = updatedProduto.PrecoCusto; // Exemplo de atualização
            produto.PrecoVenda = updatedProduto.PrecoVenda; // Exemplo de atualização
            produto.Descricao = updatedProduto.Descricao; // Exemplo de atualização

            // Salva as alterações no banco de dados
            dbContext.SaveChanges();
        }


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
