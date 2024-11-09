namespace cpr_react.Server
{
    public class RegistroFrota
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public DateTime DataRevisao { get; set; } = DateTime.Now;
        public DateTime DataAbastecimento { get; set; } = DateTime.Now;
        public DateTime DataOleo { get; set; } = DateTime.Now;
        public DateTime DataBalanceamento { get; set; } = DateTime.Now;
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public decimal? PrecoAbastecimento { get; set; }
        public int? Quilometragem { get; set; }
        public string? Placa { get; set; }
        public string? Observacao { get; set; }
        public string? ParaConsertar { get; set; }

    }
}
