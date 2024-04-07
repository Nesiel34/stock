namespace WebApi.Models
{
    public class Stock
    {
        public int StockId { get; set; }
        public string StockName { get; set;}
        public double BasePrice { get; set; }
        public int BidQty {  get; set; }
        public double BidPrice { get; set; }
        public int AskQty { get; set; }
        public double AskPrice { get; set; }
        public double LastPrice { get; set; }
        public DateTime LastUpdateTime { get; set; }


    }
}
