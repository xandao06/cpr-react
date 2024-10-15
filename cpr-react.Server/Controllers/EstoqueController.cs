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




    }
}
