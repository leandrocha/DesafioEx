using DesafioEx.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace DesafioEx.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : ControllerBase
    {
        private static readonly List<Produto> _produtos = new List<Produto>([
            new Produto { Id = 1, Nome = "Televisão", Preco = 5000 },
            new Produto { Id = 2, Nome = "Notebook", Preco = 3000},
            new Produto { Id = 3, Nome = "Celular", Preco = 1000 }
            ]);

        private readonly ILogger<ProdutoController> _logger;

        public ProdutoController(ILogger<ProdutoController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetProdutos")]
        public IEnumerable<Produto> Get()
        {
            return _produtos;
        }

        [HttpGet("{produtoNome}")]
        public async Task<IActionResult> GetByNome(string produtoNome)
        {
            var produto = await Task.Run(() => _produtos.FirstOrDefault(p => p.Nome == produtoNome));
            return produto == null ? NotFound() : Ok(produto);
        }
    }
}
