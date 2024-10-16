using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace cpr_react.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        private readonly CPRDbContext _dbcontext;
        private readonly EstoqueService estoqueService;
        private readonly ILogger<EstoqueController> _logger;

        public EstoqueController(ILogger<EstoqueController> logger, CPRDbContext dbContext, EstoqueService estoqueService)
        {
            _logger = logger;
            this.estoqueService = estoqueService;
            _dbcontext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _dbcontext.Produtos.ToListAsync();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarProduto(int id)
        {
            var produto = _dbcontext.Produtos.Find(id);

            if (produto == null)
            {
                return NotFound();
            }

            estoqueService.Deletar(id);
            return Ok();
        }


        [HttpPost("AddOuUpdateEntrada")]
        public async Task<IActionResult> AddOuUpdate(int id, [FromBody] Produto produto)
        {

            var produtoExistente = await _dbcontext.Produtos
            .FirstOrDefaultAsync(p => p.Nome != null && p.Nome.ToLower() == produto.Nome!.ToLower());

            if (produtoExistente != null)
            {
                estoqueService.UpdateEntrada(id, produto);
            }

            else
            {
                await _dbcontext.Produtos.AddAsync(produto);
            }

            await _dbcontext.SaveChangesAsync();

            return Ok(produto);
        }


        [HttpPut("UpdateSaida")]
        public async Task<IActionResult> UpdateSaida(int id, [FromBody] Produto produto)
        {
            if (produto == null)
            {
                return BadRequest("Produto não pode ser nulo.");
            }

            var produtoExistente = await _dbcontext.Produtos
            .FirstOrDefaultAsync(p => p.Nome != null && p.Nome.ToLower() == produto.Nome!.ToLower());
            if (produtoExistente != null)
            {
                // Atualiza as propriedades do produto existente
                produtoExistente.CodigoSistema = produto.CodigoSistema; // Exemplo: apenas soma a quantidade
                produtoExistente.Marca = produto.Marca; // Exemplo: apenas soma a quantidade
                produtoExistente.Modelo = produto.Modelo; // Exemplo: apenas soma a quantidade
                produtoExistente.Quantidade -= produto.Quantidade; // Exemplo: apenas soma a quantidade
                produtoExistente.PrecoCusto = produto.PrecoCusto; // Atualiza o preço de custo
                produtoExistente.PrecoVenda = produto.PrecoVenda; // Atualiza o preço de venda
                produtoExistente.Descricao = produto.Descricao; // Atualiza a descrição
                // Atualize outras propriedades conforme necessário

                _dbcontext.Produtos.Update(produtoExistente);
            }
            else
            {
                // Adiciona um novo produto
                await _dbcontext.Produtos.AddAsync(produto);
            }

            await _dbcontext.SaveChangesAsync();

            return Ok(produto);
        }

    }
}