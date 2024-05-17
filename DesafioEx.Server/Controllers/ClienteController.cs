using DesafioEx.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesafioEx.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClienteController : ControllerBase
    {
        private static readonly List<Cliente> _clientes = new List<Cliente>();

        private readonly ILogger<ClienteController> _logger;

        public ClienteController(ILogger<ClienteController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            return _clientes;
        }

        [HttpGet("{documento}")]
        public async Task<IActionResult> GetByDocumento(string documento)
        {
            var cliente = await Task.Run(() => _clientes.FirstOrDefault(c => c.Documento == documento));
            return cliente == null ? NotFound() : Ok(cliente);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Cliente cliente)
        {
            if (_clientes.Any(c => c.Documento == cliente.Documento))
                return BadRequest("Já existe um cliente com o mesmo documento.");

            await Task.Run(() => _clientes.Add(cliente));
            return CreatedAtAction(nameof(Get), new { id = cliente.Documento }, cliente);
        }
    }
}
