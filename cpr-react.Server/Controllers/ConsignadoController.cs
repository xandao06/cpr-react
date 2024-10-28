using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsignadoController : ControllerBase
    {
        private readonly CPRDbContext _dbcontext;
        private readonly ConsignadoService consignadoService;
        private readonly ILogger<ConsignadoController> _logger;

        public ConsignadoController(ILogger<ConsignadoController> logger, CPRDbContext dbContext, ConsignadoService consignadoService)
        {
            _logger = logger;
            this.consignadoService = consignadoService;
            _dbcontext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipamento>>> GetConsignados()
        {
            return await _dbcontext.Equipamentos.ToListAsync();
        }

        [HttpPost]
        public IActionResult AddConsignado([FromBody] Equipamento equipamento)
        {
            consignadoService.Add(equipamento);
            return CreatedAtAction(nameof(GetConsignados), new { id = equipamento.Id }, equipamento); // Retorna o chamado criado
        }

        [HttpPut("{id}")]
        public IActionResult UpdateChamado(int id, [FromBody] Equipamento updatedEquipamento)
        {
            if (updatedEquipamento == null)
            {
                return BadRequest("Chamado não pode ser nulo.");
            }
            consignadoService.Update(id, updatedEquipamento); // Altere para aceitar o chamado atualizado
            return Ok(updatedEquipamento); // Retorna o chamado atualizado
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarChamado(int id)
        {
            var equipamento = _dbcontext.Equipamentos.Find(id);

            if (equipamento == null)
            {
                return NotFound();
            }

            consignadoService.Deletar(id);
            return Ok();
        }
    }
}
