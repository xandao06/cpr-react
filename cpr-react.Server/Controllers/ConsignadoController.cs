using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using System.IO;
using iTextSharp.text.pdf;
using iTextSharp.text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

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

        //[HttpPost]
        //public IActionResult AddConsignado([FromBody] Equipamento equipamento)
        //{
        //    consignadoService.Add(equipamento);
        //    return CreatedAtAction(nameof(GetConsignados), new { id = equipamento.Id }, equipamento); // Retorna o chamado criado
        //}

        [HttpPost("AddConsignado")]
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


        [HttpGet("gerar-pdf")]
        public async Task<IActionResult> GerarPdf()
        {
            var equipamentos = await _dbcontext.Equipamentos.ToListAsync();

            // Verificação para garantir que existem equipamentos
            if (equipamentos == null || !equipamentos.Any())
            {
                return NotFound("Nenhum equipamento encontrado.");
            }

            using (var ms = new MemoryStream())
            {
                Document doc = new Document(PageSize.A4);
                PdfWriter.GetInstance(doc, ms);
                doc.Open();

                // Cabeçalho
                PdfPTable headerTable = new PdfPTable(2);
                headerTable.WidthPercentage = 100;

                var clienteCell = new PdfPCell(new Phrase($"Cliente: {equipamentos[0].Cliente}")) { HorizontalAlignment = Element.ALIGN_LEFT, Border = PdfPCell.NO_BORDER };
                var dataCell = new PdfPCell(new Phrase($"Data: {DateTime.Now.ToShortDateString()}")) { HorizontalAlignment = Element.ALIGN_RIGHT, Border = PdfPCell.NO_BORDER };

                headerTable.AddCell(clienteCell);
                headerTable.AddCell(dataCell);

                doc.Add(headerTable);
                doc.Add(new Paragraph("\n")); // Espaço

                // Título da seção de produtos
                doc.Add(new Paragraph("P R O D U T O S", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 16))
                {
                    Alignment = Element.ALIGN_CENTER
                });
                doc.Add(new Paragraph("\n")); // Espaço

                // Tabela de produtos
                PdfPTable produtosTable = new PdfPTable(4);
                produtosTable.WidthPercentage = 100;

                // Adiciona os cabeçalhos da tabela
                produtosTable.AddCell("Tipo");
                produtosTable.AddCell("Marca");
                produtosTable.AddCell("Modelo");
                produtosTable.AddCell("Quantidade");

                // Adiciona produtos à tabela
                foreach (var equipamento in equipamentos)
                {
                    produtosTable.AddCell(equipamento.Tipo);
                    produtosTable.AddCell(equipamento.Marca);
                    produtosTable.AddCell(equipamento.Modelo);
                    produtosTable.AddCell(equipamento.Quantidade.ToString());
                }

                doc.Add(produtosTable);
                doc.Add(new Paragraph("\n")); // Espaço

                // Total e detalhes adicionais
                foreach (var equipamento in equipamentos)
                {
                    doc.Add(new Paragraph($"Descrição: {equipamento.Descricao}", FontFactory.GetFont(FontFactory.HELVETICA, 12)));
                    doc.Add(new Paragraph($"Número de Série: {equipamento.NumeroSerie}", FontFactory.GetFont(FontFactory.HELVETICA, 12)));
                    doc.Add(new Paragraph($"Total: {equipamento.Preco}\n", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));
                }

                // Assinatura
                doc.Add(new Paragraph("\n"));
                doc.Add(new Paragraph("CLIENTE: ___________________________", FontFactory.GetFont(FontFactory.HELVETICA, 12)));

                // Fecha o documento
                doc.Close();

                return File(ms.ToArray(), "application/pdf", "relatorio.pdf");
            }
        }
    }
}



 //       [HttpGet("gerar-pdf")]
 //       public async Task<IActionResult> GerarPdf()
 //       {
 //           var equipamentos = await _dbcontext.Equipamentos.ToListAsync();

//          if (equipamentos == null || !equipamentos.Any())
//           {
//               return NotFound("Nenhum equipamento encontrado.");
//           }

//           string caminhoDoArquivoTXL = Path.Combine(Directory.GetCurrentDirectory(), "Layout", "Consignado.txl");
//           string layout = System.IO.File.ReadAllText(caminhoDoArquivoTXL);

//           var equipamentosString = new StringBuilder();
//           foreach (var equipamento in equipamentos)
//           {
//               equipamentosString.AppendLine($"{equipamento.Cliente}|{equipamento.Descricao}|{equipamento.Quantidade}|{equipamento.NumeroSerie}|{equipamento.Quantidade}|{equipamento.Marca}|{equipamento.Modelo}|{equipamento.Preco}|{equipamento.Tipo}");
//           }

//           var dataAtual = DateTime.Now.ToString("dd/MM/yyyy");

//           layout = layout.Replace("{Cliente}", equipamentos.First().Cliente)
//                          .Replace("{Data}", dataAtual)
//                          .Replace("{Tipo}", equipamentos.First().Tipo)
//                          .Replace("{Marca}", equipamentos.First().Marca)
//                          .Replace("{Modelo}", equipamentos.First().Modelo)
//                          .Replace("{QNTD}", equipamentos.First().Quantidade)
//                          .Replace("{NS}", equipamentos.First().NumeroSerie)
//                          .Replace("{Descrição}", equipamentos.First().Descricao)
//                          .Replace("{Total}", equipamentos.First().Preco.ToString());


//           using (var ms = new MemoryStream())
//           {
//               Document doc = new Document(PageSize.A4);
//               PdfWriter.GetInstance(doc, ms);
//               doc.Open();

//               PdfPTable table = new PdfPTable(1) 
//               {
//                   WidthPercentage = 100 
//               };

//               PdfPCell cell = new PdfPCell(new Phrase(layout))
//               {
//                   HorizontalAlignment = Element.ALIGN_CENTER, 
//                   VerticalAlignment = Element.ALIGN_MIDDLE,
//                   Border = Rectangle.NO_BORDER 
//               };

//               table.AddCell(cell);

//               doc.Add(table);

//               doc.Close();

//               return File(ms.ToArray(), "application/pdf", "relatorio.pdf");
//           }
//       }
//   }
//}
