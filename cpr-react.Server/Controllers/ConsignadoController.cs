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


        //[HttpGet("gerar-pdf")]
        //public async Task<IActionResult> GerarPdf()
        //{
        //    var equipamentos = await _dbcontext.Equipamentos.ToListAsync();

        //    if (equipamentos == null || !equipamentos.Any())
        //    {
        //        return NotFound("Nenhum equipamento encontrado.");
        //    }

        //    var equipamento = equipamentos.First();
        //    var dataAtual = DateTime.Now.ToString("dd/MM/yyyy");

        //    using (var ms = new MemoryStream())
        //    {
        //        Document doc = new Document(PageSize.A4);
        //        PdfWriter.GetInstance(doc, ms);
        //        doc.Open();


        //        PdfPTable table = new PdfPTable(1) { WidthPercentage = 100 };


        //        PdfPTable headerTable = new PdfPTable(3) { WidthPercentage = 100 };
        //        headerTable.SetWidths(new float[] { 1f, 3f, 1.5f });


        //        string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "Img", "cpr.png");
        //        if (!System.IO.File.Exists(logoPath))
        //        {
        //            return NotFound("Logo não encontrada.");
        //        }
        //        Image logo = Image.GetInstance(logoPath);
        //        logo.ScaleToFit(60f, 60f);
        //        PdfPCell logoCell = new PdfPCell(logo) { Border = Rectangle.NO_BORDER, HorizontalAlignment = Element.ALIGN_LEFT };
        //        headerTable.AddCell(logoCell);


        //        PdfPCell titleCell = new PdfPCell(new Phrase("EQUIPAMENTO EMPRESTADO", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            HorizontalAlignment = Element.ALIGN_CENTER,
        //            VerticalAlignment = Element.ALIGN_MIDDLE,
        //            PaddingBottom = 10f
        //        };
        //        headerTable.AddCell(titleCell);


        //        PdfPCell dateCell = new PdfPCell(new Phrase($"Data: {dataAtual}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            HorizontalAlignment = Element.ALIGN_RIGHT
        //        };
        //        headerTable.AddCell(dateCell);


        //        PdfPCell clienteCell = new PdfPCell(new Phrase($"Cliente: {equipamento.Cliente}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            Colspan = 3,
        //            HorizontalAlignment = Element.ALIGN_LEFT,
        //            PaddingTop = 10f
        //        };
        //        headerTable.AddCell(clienteCell);

        //        table.AddCell(headerTable);


        //        PdfPCell produtosCell = new PdfPCell(new Phrase("EQUIPAMENTO:", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            PaddingLeft = 195f,
        //            PaddingTop = 10f,
        //            PaddingBottom = 10f
        //        };
        //        produtosCell.Colspan = 3;
        //        table.AddCell(produtosCell);

        //        PdfPTable detailsTable = new PdfPTable(4);
        //        detailsTable.AddCell(CreateCell($"Tipo: {equipamento.Tipo}", Element.ALIGN_LEFT));
        //        detailsTable.AddCell(CreateCell($"Marca: {equipamento.Marca}", Element.ALIGN_LEFT));
        //        detailsTable.AddCell(CreateCell($"Modelo: {equipamento.Modelo}", Element.ALIGN_LEFT));
        //        detailsTable.AddCell(CreateCell($"Quantidade: {equipamento.Quantidade}", Element.ALIGN_LEFT));
        //        table.AddCell(detailsTable);

        //        PdfPTable descriptionTable = new PdfPTable(3);
        //        descriptionTable.AddCell(CreateCell($"Descrição: {equipamento.Descricao}", Element.ALIGN_LEFT));
        //        descriptionTable.AddCell(CreateCell($"Número de Série: {equipamento.NumeroSerie}", Element.ALIGN_LEFT));
        //        descriptionTable.AddCell(CreateCell($"Preço: {equipamento.Preco}", Element.ALIGN_LEFT));
        //        table.AddCell(descriptionTable);

        //        PdfPTable assinaturaTable = new PdfPTable(1) { WidthPercentage = 100 };
        //        assinaturaTable.SpacingBefore = 30f;

        //        PdfPCell assinaturaCell = new PdfPCell(new Phrase("___/___/____          ____________________________________________________"))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            HorizontalAlignment = Element.ALIGN_CENTER,
        //            PaddingBottom = 5f,
        //            PaddingRight = 30f
        //        };

        //        PdfPCell clienteAssinaturaCell = new PdfPCell(new Phrase($"{equipamento.Cliente}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
        //        {
        //            Border = Rectangle.NO_BORDER,
        //            HorizontalAlignment = Element.ALIGN_CENTER,
        //            PaddingLeft = 30f
        //        };

        //        assinaturaTable.AddCell(assinaturaCell);
        //        assinaturaTable.AddCell(clienteAssinaturaCell);

        //        table.AddCell(assinaturaTable);


        //        doc.Add(table);
        //        doc.Close();

        //        return File(ms.ToArray(), "application/pdf", "relatorio.pdf");
        //    }
        //}


        //private PdfPCell CreateCell(string text, int alignment, bool bold = false)
        //{
        //    var font = bold ? FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10) : FontFactory.GetFont(FontFactory.HELVETICA, 10);
        //    var cell = new PdfPCell(new Phrase(text, font))
        //    {
        //        HorizontalAlignment = alignment,
        //        Border = Rectangle.NO_BORDER,
        //        PaddingBottom = 5,
        //    };
        //    return cell;
        //}

        [HttpGet("gerar-pdf/{id}")]
        public async Task<IActionResult> GerarPdf(int id)
        {
            // Busque o equipamento específico pelo ID
            var equipamento = await _dbcontext.Equipamentos.FirstOrDefaultAsync(e => e.Id == id);

            if (equipamento == null)
            {
                return NotFound("Equipamento não encontrado.");
            }

            var dataAtual = DateTime.Now.ToString("dd/MM/yyyy");

            using (var ms = new MemoryStream())
            {
                Document doc = new Document(PageSize.A4);
                PdfWriter.GetInstance(doc, ms);
                doc.Open();

                PdfPTable table = new PdfPTable(1) { WidthPercentage = 100 };

                PdfPTable headerTable = new PdfPTable(3) { WidthPercentage = 100 };
                headerTable.SetWidths(new float[] { 1f, 3f, 1.5f });

                string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "Img", "cpr.png");
                if (!System.IO.File.Exists(logoPath))
                {
                    return NotFound("Logo não encontrada.");
                }

                Image logo = Image.GetInstance(logoPath);
                logo.ScaleToFit(60f, 60f);
                PdfPCell logoCell = new PdfPCell(logo) { Border = Rectangle.NO_BORDER, HorizontalAlignment = Element.ALIGN_LEFT };
                headerTable.AddCell(logoCell);

                PdfPCell titleCell = new PdfPCell(new Phrase("EQUIPAMENTO EMPRESTADO", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)))
                {
                    Border = Rectangle.NO_BORDER,
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    VerticalAlignment = Element.ALIGN_MIDDLE,
                    PaddingBottom = 10f
                };
                headerTable.AddCell(titleCell);

                PdfPCell dateCell = new PdfPCell(new Phrase($"Data: {dataAtual}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
                {
                    Border = Rectangle.NO_BORDER,
                    HorizontalAlignment = Element.ALIGN_RIGHT
                };
                headerTable.AddCell(dateCell);

                PdfPCell clienteCell = new PdfPCell(new Phrase($"Cliente: {equipamento.Cliente}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
                {
                    Border = Rectangle.NO_BORDER,
                    Colspan = 3,
                    HorizontalAlignment = Element.ALIGN_LEFT,
                    PaddingTop = 10f
                };
                headerTable.AddCell(clienteCell);

                table.AddCell(headerTable);

                PdfPCell produtosCell = new PdfPCell(new Phrase("EQUIPAMENTO:", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)))
                {
                    Border = Rectangle.NO_BORDER,
                    PaddingLeft = 195f,
                    PaddingTop = 10f,
                    PaddingBottom = 10f
                };
                produtosCell.Colspan = 3;
                table.AddCell(produtosCell);

                PdfPTable detailsTable = new PdfPTable(4);
                detailsTable.AddCell(CreateCell($"Tipo: {equipamento.Tipo}", Element.ALIGN_LEFT));
                detailsTable.AddCell(CreateCell($"Marca: {equipamento.Marca}", Element.ALIGN_LEFT));
                detailsTable.AddCell(CreateCell($"Modelo: {equipamento.Modelo}", Element.ALIGN_LEFT));
                detailsTable.AddCell(CreateCell($"Quantidade: {equipamento.Quantidade}", Element.ALIGN_LEFT));
                table.AddCell(detailsTable);

                PdfPTable descriptionTable = new PdfPTable(3);
                descriptionTable.AddCell(CreateCell($"Descrição: {equipamento.Descricao}", Element.ALIGN_LEFT));
                descriptionTable.AddCell(CreateCell($"Número de Série: {equipamento.NumeroSerie}", Element.ALIGN_LEFT));
                descriptionTable.AddCell(CreateCell($"Preço: {equipamento.Preco}", Element.ALIGN_LEFT));
                table.AddCell(descriptionTable);

                PdfPTable assinaturaTable = new PdfPTable(1) { WidthPercentage = 100 };
                assinaturaTable.SpacingBefore = 30f;

                PdfPCell assinaturaCell = new PdfPCell(new Phrase("___/___/____          ____________________________________________________"))
                {
                    Border = Rectangle.NO_BORDER,
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    PaddingBottom = 5f,
                    PaddingRight = 30f
                };

                PdfPCell clienteAssinaturaCell = new PdfPCell(new Phrase($"{equipamento.Cliente}", FontFactory.GetFont(FontFactory.HELVETICA, 10)))
                {
                    Border = Rectangle.NO_BORDER,
                    HorizontalAlignment = Element.ALIGN_CENTER,
                    PaddingLeft = 30f
                };

                assinaturaTable.AddCell(assinaturaCell);
                assinaturaTable.AddCell(clienteAssinaturaCell);

                table.AddCell(assinaturaTable);

                doc.Add(table);
                doc.Close();

                return File(ms.ToArray(), "application/pdf", "relatorio.pdf");
            }
        }


        private PdfPCell CreateCell(string text, int alignment, bool bold = false)
        {
            var font = bold ? FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10) : FontFactory.GetFont(FontFactory.HELVETICA, 10);
            var cell = new PdfPCell(new Phrase(text, font))
            {
                HorizontalAlignment = alignment,
                Border = Rectangle.NO_BORDER,
                PaddingBottom = 5,
            };
            return cell;
        }



    }
}
