using Microsoft.AspNetCore.SignalR;

namespace cpr_react.Server.Hubs
{
    public class ChamadoHub : Hub
    {
        private readonly IDictionary<string, bool> _chamado;
        public ChamadoHub(IDictionary<string, bool> chamado)
        {
            _chamado = chamado;
        }
        public async Task CriarChamado(Chamado chamado)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chamado.Id.ToString());
            await Clients.All.SendAsync("ReceiveMessage", chamado);
        }
    }
}
