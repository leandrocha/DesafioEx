using DesafioEx.Server.Controllers;
using DesafioEx.Server.Models;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Newtonsoft.Json;

namespace DesafioEx.Server.Service
{
    public class ExcelService
    {
        private readonly ClienteController _clienteController;
        private readonly PedidoController _pedidoController;
        private readonly ProdutoController _produtoController;

        public ExcelService(ClienteController clienteController, PedidoController pedidoController, ProdutoController produtoController)
        {
            _clienteController = clienteController;
            _pedidoController = pedidoController;
            _produtoController = produtoController;
        }

        public async Task<List<Pedido>> ReadExcelFile(Stream fileStream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(fileStream))
            {
                var worksheet = package.Workbook.Worksheets[0];

                var rowCount = worksheet.Dimension.Rows;
                var result = new List<Pedido>();

                for (int row = 2; row <= rowCount; row++)
                {
                    string _documento = worksheet.Cells[row, 1].Value == null ? "" : worksheet.Cells[row, 1].Value.ToString().Replace(".", "").Replace("-", "");
                    string _razaoSocial = worksheet.Cells[row, 2].Value == null ? "" : worksheet.Cells[row, 2].Value.ToString();
                    string _cep = worksheet.Cells[row, 3].Value == null ? "" : worksheet.Cells[row, 3].Value.ToString().Replace("-", "");
                    string _produto = worksheet.Cells[row, 4].Value == null ? "" : worksheet.Cells[row, 4].Value.ToString();
                    int _numeroPedido = worksheet.Cells[row, 5].Value == null ? 0 : int.Parse(worksheet.Cells[row, 5].Value.ToString());
                    string _data = worksheet.Cells[row, 6].Value == null ? "" : worksheet.Cells[row, 6].Value.ToString();

                    if (_documento != "")
                    {
                        await addCliente(_documento, _razaoSocial, _cep);
                        await addPedido(_documento, _produto, _numeroPedido, _data);
                    }

                }

                return result;
            }
        }

        async Task addCliente(string documento, string razaoSocial, string cep)
        {
            ViaCep _logradouro = await ConsultarCEP(cep);
            string _Uf = _logradouro == null ? "" : _logradouro.UF;
            var cliente = new Cliente
            {
                Documento = documento,
                RazaoSocial = razaoSocial,
                Cep = cep,
                Uf = _Uf
            };
            await _clienteController.Post(cliente);
        }

        async Task<ViaCep> ConsultarCEP(string cep)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"https://viacep.com.br/ws/{cep}/json/");

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<ViaCep>(responseBody);
                }

                return JsonConvert.DeserializeObject<ViaCep>(null);
            }
        }

        async Task addPedido(string documento, string produto, int numeroPedido, string data)
        {
            DateTime dataReferencia = new DateTime(1900, 1, 1);

            try
            {
                var _cliente = await _clienteController.GetByDocumento(documento) as ObjectResult;
                var _produto = await _produtoController.GetByNome(produto) as ObjectResult;
                var _data = dataReferencia.AddDays(double.Parse(data) - 1 - 1);

                if (_cliente == null)
                    throw new ArgumentException("Cliente não encontrado");

                if (_produto == null)
                    throw new ArgumentException("Produto não encontrado");

                var pedido = new Pedido
                {
                    Cliente = _cliente.Value as Cliente,
                    Produto = _produto.Value as Produto,
                    Data = _data,
                    Numero = numeroPedido
                };
                await _pedidoController.Post(pedido);
            }
            catch (ArgumentException)
            {
                throw;
            }
        }

    }
}
