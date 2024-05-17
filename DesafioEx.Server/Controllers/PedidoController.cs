using DesafioEx.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesafioEx.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : ControllerBase
    {
        private static readonly List<Pedido> _pedidos = new List<Pedido>();

        private readonly ILogger<PedidoController> _logger;

        public PedidoController(ILogger<PedidoController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetPedidos")]
        public IEnumerable<Pedido> Get()
        {
            return _pedidos;
        }

        [HttpPost(Name = "PostPedido")]
        public async Task<IActionResult> Post(Pedido pedido)
        {
            if (_pedidos.Any(c => c.Numero == pedido.Numero))
                return BadRequest("Já existe um Pedido com o mesmo número.");

            await Task.Run(() => _pedidos.Add(pedido));
            return CreatedAtAction(nameof(Get), new { id = pedido.Numero }, pedido);
        }
    }
}
