using Microsoft.AspNetCore.Http.HttpResults;
using WebApi.DATA;
using WebApi.Models;

namespace WebApi
{
    public class StockBAL
    {
        StockList stockList = new StockList();
        public StockBAL() { 
        }

        public List<Stock> getStocks()
        {
            return stockList.stocks;//return all stocks
        }

        public Stock getStockById(int id)
        {
            return stockList.stocks.Find(f => f.StockId == id);//return stock by id
        }

        public void UpdateStock(List<Stock> stocks) {
            foreach (Stock item in stocks)
            {
                Random rnd = new Random();//randomly update stock
                item.AskQty = item.AskQty + rnd.Next(-10,10);
                item.AskPrice = item.AskPrice + rnd.Next(-10,10);
                item.BidQty = item.BidQty + rnd.Next(-10, 10);
                item.BidPrice = item.BidPrice + rnd.Next(-10, 10);
                item.LastPrice = item.LastPrice + rnd.Next(-10, 10);
                item.LastUpdateTime = DateTime.Now;
                stockList.updateStock(item);
            }
        }

    }
}
