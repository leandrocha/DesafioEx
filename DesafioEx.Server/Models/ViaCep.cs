using System.Text.Json.Serialization;

namespace DesafioEx.Server.Models
{
    public class ViaCep
    {
        [JsonPropertyName("logradouro")]
        public string Logradouro { get; set; }
        [JsonPropertyName("bairro")]
        public string Bairro { get; set; }
        [JsonPropertyName("uf")]
        public string UF { get; set;}
    }
}
