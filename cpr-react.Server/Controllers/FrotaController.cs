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
    public class FrotaController : ControllerBase
    {
        private readonly CPRDbContext _dbcontext;
        private readonly FrotaService frotaService;
        private readonly ILogger<FrotaController> _logger;

        public FrotaController(ILogger<FrotaController> logger, CPRDbContext dbContext, FrotaService frotaService)
        {
            _logger = logger;
            this.frotaService = frotaService;
            _dbcontext = dbContext;
        }

        [HttpGet("GetVeiculos")]
        public async Task<ActionResult<IEnumerable<Veiculo>>> GetVeiculos()
        {
            return await _dbcontext.Veiculos.ToListAsync();
        }

        [HttpGet("GetRegistros")]
        public async Task<ActionResult<IEnumerable<RegistroFrota>>> GetRegistros()
        {
            return await _dbcontext.Registros.ToListAsync();
        }

        [HttpPost("AddVeiculo")]
        public IActionResult AddVeiculo([FromBody] Veiculo veiculo)
        {
            frotaService.AddVeiculo(veiculo);
            return CreatedAtAction(nameof(GetVeiculos), new { id = veiculo.Id }, veiculo);
        }

        [HttpPost("AddRegistros")]
        public IActionResult AddRegistro([FromBody] RegistroFrota registro)
        {
            frotaService.AddRegistro(registro);
            return CreatedAtAction(nameof(GetRegistros), new { id = registro.Id }, registro);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVeiculo(int id, [FromBody] Veiculo updatedVeiculo)
        {
            if (updatedVeiculo == null)
            {
                return BadRequest("veiculo não pode ser nulo.");
            }
            frotaService.Update(id, updatedVeiculo); 
            return Ok(updatedVeiculo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarVeiculo(int id)
        {
            var veiculo = _dbcontext.Veiculos.Find(id);

            if (veiculo == null)
            {
                return NotFound();
            }

            frotaService.Deletar(id);
            return Ok();
        }
    }
}


