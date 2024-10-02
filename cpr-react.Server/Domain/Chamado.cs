namespace cpr_react.Server
{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public string? Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        public string? Cliente { get; set; } 
        public string? Descricao { get; set; }
        public string? Contrato { get; set; }
        public string? Urgencia { get; set; }
        public string? Status { get; set; }
        public string? Opcoes { get; set; }
  
    }
}
