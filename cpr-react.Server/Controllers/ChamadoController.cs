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


        // LOG DE ERROS

        [HttpGet("error-logs")]
        public IActionResult ErrorLogs()
        {
            try
            {
                // Sua lógica para recuperar os logs de erro
                var errorLogs = GetErrorLogs(); // Substitua isso pela sua lógica

                if (errorLogs == null || !errorLogs.Any())
                {
                    return NotFound("Nenhum log de erro encontrado.");
                }

                return Ok(errorLogs);
            }
            catch (Exception ex)
            {
                // Aqui você pode registrar o erro, se necessário
                Console.Error.WriteLine($"Erro ao recuperar logs: {ex.Message}");

                return StatusCode(500, "Um erro ocorreu ao recuperar os logs.");
            }
        }

        private IEnumerable<string> GetErrorLogs()
        {
            // Implemente sua lógica para buscar os logs de erro
            return new List<string>(); // Exemplo, retorne sua lista real
        }

        /////
    }
}


