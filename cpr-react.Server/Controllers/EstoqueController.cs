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

        [HttpPost("AddEntrada")]
        public async Task<IActionResult> AddEntrada([FromBody] Produto produto)
        {
            if (produto == null)
            {
                return BadRequest("Produto não pode ser nulo.");
            }

            var produtoExistente = await _dbcontext.Produtos
                .FirstOrDefaultAsync(p => p.Nome != null && p.Nome.ToLower() == produto.Nome!.ToLower());

            if (produtoExistente != null)
            {
                return Conflict("Produto com o mesmo nome já existe.");
            }

            await _dbcontext.Produtos.AddAsync(produto);
            await _dbcontext.SaveChangesAsync();

            return Ok(produto);
        }



        [HttpPut("UpdateEntrada/{id}")]
        public async Task<IActionResult> UpdateEntrada(int id, [FromBody] Produto produto)
        {
            // Chama o serviço para atualizar o produto
           var produtoAtualizado = await estoqueService.UpdateEntradaProduto(id, produto);

            return Ok(produtoAtualizado);
        }
        
        
        [HttpPut("UpdateSaida/{id}")]
        public async Task<IActionResult> UpdateSaida(int id, [FromBody] Produto produto)
        {
            // Chama o serviço para atualizar o produto
           var produtoAtualizado = await estoqueService.UpdateSaidaProduto(id, produto);

            return Ok(produtoAtualizado);
        }


    }
}