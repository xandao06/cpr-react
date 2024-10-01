using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChamadoController : ControllerBase
    {
        private readonly CPRDbContext _dbcontext;
        private readonly ChamadoService chamadoService;
        private readonly ILogger<ChamadoController> _logger;

        public ChamadoController(ILogger<ChamadoController> logger, CPRDbContext dbContext, ChamadoService chamadoService)
        {
            _logger = logger;
            this.chamadoService = chamadoService;
            _dbcontext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chamado>>> GetChamados()
        { 
            return await _dbcontext.Chamados.ToListAsync();
        }

        [HttpPost]
        public IActionResult AddChamado([FromBody] Chamado chamado)
        {
            chamadoService.Add(chamado);
            return CreatedAtAction(nameof(GetChamados), new { id = chamado.Id }, chamado); // Retorna o chamado criado
        }


        //[HttpGet(Name = "GetChamado")]
        //public IActionResult GetChamados()
        //{
        //    var chamados = chamadoService.GetAll();
        //    if (chamados == null || !chamados.Any())
        //    {
        //        return NoContent();
        //    }
        //    return Ok(chamados);

        //}
    }
}


