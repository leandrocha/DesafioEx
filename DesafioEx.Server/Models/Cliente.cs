namespace DesafioEx.Server.Models
{
    public class Cliente
    {
        public required string Documento { get; set; }
        public required string RazaoSocial { get; set; }
        public required string Cep { get; set; }
        public required string Uf { get; set; }
    }
}
