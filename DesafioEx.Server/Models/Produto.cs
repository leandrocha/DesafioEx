namespace DesafioEx.Server.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required float Preco { get; set; }
    }
}
