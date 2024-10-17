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

        public async Task<Produto> UpdateEntradaProduto(int id, Produto updatedProduto)
        {
            Produto? produto = await dbContext.Set<Produto>().FindAsync(id);

            if (produto == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }

            produto.CodigoSistema = updatedProduto.CodigoSistema; 
            produto.Marca = updatedProduto.Marca;
            produto.Modelo = updatedProduto.Modelo; 
            produto.Quantidade += updatedProduto.Quantidade;
            produto.PrecoCusto = updatedProduto.PrecoCusto;
            produto.PrecoVenda = updatedProduto.PrecoVenda; 
            produto.Descricao = updatedProduto.Descricao; 

            await dbContext.SaveChangesAsync();

            return produto;
        }
        
        
        public async Task<Produto> UpdateSaidaProduto(int id, Produto updatedProduto)
        {
            Produto? produto = await dbContext.Set<Produto>().FindAsync(id);

            if (produto == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }

            produto.CodigoSistema = updatedProduto.CodigoSistema; 
            produto.Marca = updatedProduto.Marca;
            produto.Modelo = updatedProduto.Modelo; 
            produto.Quantidade -= updatedProduto.Quantidade;
            produto.PrecoCusto = updatedProduto.PrecoCusto;
            produto.PrecoVenda = updatedProduto.PrecoVenda; 
            produto.Descricao = updatedProduto.Descricao; 

            await dbContext.SaveChangesAsync();

            return produto;
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
