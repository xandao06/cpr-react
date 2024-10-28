namespace cpr_react.Server
{
    public class Equipamento
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public string? Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        public string? Cliente { get; set; }
        public string? Descricao { get; set; }
        public string? Contrato { get; set; }
        public string? Status { get; set; }
        public string? NumeroSerie { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public decimal? Preco { get; set; }
        public string? Quantidade { get; set; }
        public string? Tipo { get; set; }

    }
}
