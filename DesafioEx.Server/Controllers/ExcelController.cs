using DesafioEx.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace DesafioEx.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExcelController : ControllerBase
    {
        private readonly ILogger<ExcelController> _logger;
        private readonly ExcelService _excelService;

        public ExcelController(ILogger<ExcelController> logger, ExcelService excelService)
        {
            _logger = logger;
            _excelService = excelService;
        }

        [HttpPost("UploadExcel")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            using (var stream = file.OpenReadStream())
            {
                var data = await _excelService.ReadExcelFile(stream);

                return Ok(data);
            }
        }
    }
}
