using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        StockBAL _stockBAL;
        public StockController(StockBAL stockBAL) {
            _stockBAL = stockBAL;//dependency injection 
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stockBAL.getStocks());//return all stocks
        }

        [HttpPut] 
        public IActionResult Put(List<Stock> stocks) {
            _stockBAL.UpdateStock(stocks);//update stocks
            List<Stock> listUpdate = new List<Stock>();
            foreach (Stock item in stocks)
            {
                listUpdate.Add(_stockBAL.getStockById(item.StockId));
            }
            return Ok(listUpdate);
        }
    }
}
