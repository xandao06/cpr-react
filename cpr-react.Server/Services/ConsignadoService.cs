using cpr_react.Server.Persistence;
using Microsoft.EntityFrameworkCore;

namespace cpr_react.Server.Services
{
    public class ConsignadoService
    {

        private readonly CPRDbContext dbContext;

        public ConsignadoService(CPRDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IReadOnlyList<Equipamento> GetAll()
        {
            return dbContext.Equipamentos.ToList();
        }

        public Equipamento? Get(int id)
        {
            return dbContext.Set<Equipamento>().Find(id);
        }

        public void Add(Equipamento equipamento)
        {
            dbContext.Equipamentos.Add(equipamento);
            dbContext.SaveChanges();
        }

        public void Update(int id, Equipamento updatedEquipamento)
        {
            Equipamento? equipamento = dbContext.Set<Equipamento>().Find(id);

            if (equipamento == null)
            {
                throw new KeyNotFoundException($"Chamado com ID {id} não encontrado.");
            }
            equipamento.Data = updatedEquipamento.Data; 
            equipamento.Hora = updatedEquipamento.Hora;
            equipamento.Cliente = updatedEquipamento.Cliente; 
            equipamento.Contrato = updatedEquipamento.Contrato;
            equipamento.Tipo = updatedEquipamento.Tipo; 
            equipamento.Marca = updatedEquipamento.Marca; 
            equipamento.Modelo = updatedEquipamento.Modelo; 
            equipamento.NumeroSerie = updatedEquipamento.NumeroSerie;
            equipamento.Quantidade = updatedEquipamento.Quantidade; 
            equipamento.Preco = updatedEquipamento.Preco; 
            equipamento.Descricao = updatedEquipamento.Descricao; 
            equipamento.Status = updatedEquipamento.Status;

            dbContext.SaveChanges();
        }


        public void Deletar (int id)
        {

            var equipamento = dbContext.Equipamentos.Find(id);
            if(equipamento != null)
            {
                dbContext.Equipamentos.Remove(equipamento);
                dbContext.SaveChanges();
            }
        }

    }
}
