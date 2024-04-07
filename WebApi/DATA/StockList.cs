using WebApi.Models;

namespace WebApi.DATA
{
    public class StockList
    {
       public List<Stock> stocks = new List<Stock>();
        public StockList()
        {
            //initialize stock list
            stocks.Add(new Stock
            {
                StockId = 1,
                StockName = "Stock 1",
                BasePrice = 100,
                BidQty = 1000,
                BidPrice = 9000,
                AskQty = 1000,
                AskPrice = 11000,
                LastPrice = 100,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 2,
                StockName = "Stock 2",
                BasePrice = 200,
                BidQty = 2000,
                BidPrice = 19000,
                AskQty = 2000,
                AskPrice = 21000,
                LastPrice = 200,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 3,
                StockName = "Stock 3",
                BasePrice = 300,
                BidQty = 3000,
                BidPrice = 29000,
                AskQty = 3000,
                AskPrice = 31000,
                LastPrice = 300,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 4,
                StockName = "Stock 4",
                BasePrice = 400,
                BidQty = 4000,
                BidPrice = 39000,
                AskQty = 4000,
                AskPrice = 41000,
                LastPrice = 400,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 5,
                StockName = "Stock 5",
                BasePrice = 500,
                BidQty = 5000,
                BidPrice = 49000,
                AskQty = 5000,
                AskPrice = 51000,
                LastPrice = 500,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 6,
                StockName = "Stock 6",
                BasePrice = 600,
                BidQty = 6000,
                BidPrice = 59000,
                AskQty = 6000,
                AskPrice = 61000,
                LastPrice = 600,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 7,
                StockName = "Stock 7",
                BasePrice = 700,
                BidQty = 7000,
                BidPrice = 69000,
                AskQty = 7000,
                AskPrice = 71000,
                LastPrice = 700,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 8,
                StockName = "Stock 8",
                BasePrice = 800,
                BidQty = 8000,
                BidPrice = 79000,
                AskQty = 8000,
                AskPrice = 81000,
                LastPrice = 800,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 9,
                StockName = "Stock 9",
                BasePrice = 900,
                BidQty = 9000,
                BidPrice = 89000,
                AskQty = 9000,
                AskPrice = 91000,
                LastPrice = 900,
                LastUpdateTime = DateTime.Now
            });
            stocks.Add(new Stock
            {
                StockId = 10,
                StockName = "Stock 10",
                BasePrice = 1000,
                BidQty = 10000,
                BidPrice = 99000,
                AskQty = 10000,
                AskPrice = 101000,
                LastPrice = 1000,
                LastUpdateTime = DateTime.Now
            });
        }

        public void updateStock(Stock stock)//update stock
        {
            int stockUpdateIndex = stocks.FindIndex(f=>f.StockId==stock.StockId);//find stock index   
            if (stockUpdateIndex != -1)
            {
                stocks[stockUpdateIndex]=stock;
            }
        }
    }
}
