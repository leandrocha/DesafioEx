using DesafioEx.Server.Controllers;
using DesafioEx.Server.Service;

namespace DesafioEx.Server
{
    public class Startup
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ExcelService>();
            services.AddScoped<ClienteController>();
            services.AddScoped<ProdutoController>();
            services.AddScoped<PedidoController>();
        }
    }
}
