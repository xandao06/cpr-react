using cpr_react.Server.Persistence;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Services
{
    public class FrotaService
    {

        private readonly CPRDbContext dbContext;

        public FrotaService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IReadOnlyList<Veiculo> GetAllVeiculo()
        {
            return dbContext.Veiculos.ToList();
        }
        
        public IReadOnlyList<RegistroFrota> GetAllRegistro()
        {
            return dbContext.Registros.ToList();
        }

        public Veiculo? GetVeiculo(int id)
        {
            return dbContext.Set<Veiculo>().Find(id);
        }

        public RegistroFrota? GetRegistro(int id)
        {
            return dbContext.Set<RegistroFrota>().Find(id);
        }

        public void AddVeiculo(Veiculo veiculo)
        {
            dbContext.Veiculos.Add(veiculo);
            dbContext.SaveChanges();
        }
        
        public void AddRegistro(RegistroFrota registro)
        {
            dbContext.Registros.Add(registro);
            dbContext.SaveChanges();
        }

        public void Update(int id, Veiculo updatedVeiculo)
        {
            Veiculo? veiculo = dbContext.Set<Veiculo>().Find(id);

            if (veiculo == null)
            {
                throw new KeyNotFoundException($"Veiculo com ID {id} não encontrado.");
            }

            veiculo.Data = updatedVeiculo.Data;
            veiculo.DataRevisao = updatedVeiculo.DataRevisao;
            veiculo.DataAbastecimento = updatedVeiculo.DataAbastecimento;
            veiculo.DataOleo = updatedVeiculo.DataOleo;
            veiculo.DataBalanceamento = updatedVeiculo.DataBalanceamento;
            veiculo.Marca = updatedVeiculo.Marca;
            veiculo.Modelo = updatedVeiculo.Modelo;
            veiculo.PrecoAbastecimento = updatedVeiculo.PrecoAbastecimento;
            veiculo.Quilometragem = updatedVeiculo.Quilometragem;
            veiculo.Placa = updatedVeiculo.Placa;
            veiculo.Observacao = updatedVeiculo.Observacao;
            veiculo.ParaConsertar = updatedVeiculo.ParaConsertar;

            dbContext.SaveChanges();
        }


        public void Deletar (int id)
        {

            var veiculo = dbContext.Veiculos.Find(id);
            if(veiculo != null)
            {
                dbContext.Veiculos.Remove(veiculo);
                dbContext.SaveChanges();
            }
        }

    }
}
