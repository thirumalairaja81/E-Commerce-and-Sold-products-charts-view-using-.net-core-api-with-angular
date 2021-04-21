using MINIPROJECT91.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public class ChartsAccessLayer : IChartsAccessLayer
    {
        DatabaseContext _context;
        public ChartsAccessLayer(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<ChartModel>> OrderByProduct()
        {
            try
            {
                var orderIds =  _context.orders.Select(e => e.orderId).ToList();
                var result = new List<reponsemodel>();
                var chartResult = new List<ChartModel>();
                foreach (var ids in orderIds)
                {
                    var order = new reponsemodel();
                    var products = _context.orders.Where(x => x.orderId == ids).Select(x => x.cartDetails).FirstOrDefault();
                    var deSerializeProduct = JsonSerializer.Deserialize<List<CartModel>>(products);
                    var orderedDate = _context.orders.Where(e => e.orderId == ids).Select(s => s.orderedDate).FirstOrDefault();
                    var list = deSerializeProduct.Select(e => e.productId).ToList();
                    result.Add(order);
                    foreach (var item in list)
                    {
                        var chart = new ChartModel();
                        var prdtName = deSerializeProduct.Where(e => e.productId == item).Select(e => e.productName).FirstOrDefault();
                        var prdtQty = deSerializeProduct.Where(e => e.productId == item).Sum(e => e.quantity);
                        var totPrice = deSerializeProduct.Where(e => e.productId == item).Sum(e => e.totalPrice);
                
                        chart.productId = item;
                        chart.productName = prdtName;
                        chart.quantity = prdtQty;
                        chart.totalPrice = totPrice;
                        chart.orderedDate = orderedDate;
                        chartResult.Add(chart);
                    }
                }
                var sum1 =  chartResult
                    .GroupBy(x => x.productId)
                      .Select(item => new ChartModel
                      {
                          productName = item.FirstOrDefault().productName,
                          productId = item.Key,
                          quantity = item.Sum(o => o.quantity),
                          totalPrice = item.Sum(o => o.totalPrice),
                          orderedDate = item.FirstOrDefault().orderedDate
                      }).ToList();
                return  sum1;
            }catch(Exception ex)
            {
                throw ex;
            }
        }

    }
}
