namespace DesafioEx.Server.Models
{
    public class Pedido
    {
        public required Cliente Cliente { get; set; }
        public required Produto Produto { get; set; }
        public required int Numero { get; set; }
        public required DateTime Data { get; set; }
    }
}
