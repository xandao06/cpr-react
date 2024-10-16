namespace cpr_react.Server
{
    public class Produto
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public DateTime DataEntrada { get; set; } = DateTime.Now;
        public DateTime DataSaida { get; set; } = DateTime.Now;
        public string? Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        public string? CodigoSistema { get; set; } 
        public string? Nome { get; set; }
        public string? Marca { get; set; }
        public string? Modelo { get; set; }
        public int? Quantidade { get; set; }
        public int? PrecoCusto { get; set; }
        public int? PrecoVenda { get; set; }
        public string? Descricao { get; set; }
        public string? Observacao { get; set; }
        public string? EntradaOuSaida { get; set; }
        public string? NumeroSerie { get; set; }
  
    }
}
