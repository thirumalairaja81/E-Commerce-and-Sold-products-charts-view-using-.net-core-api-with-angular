using MINIPROJECT91.Models.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MINIPROJECT91.DBAccess
{
    public interface IChartsAccessLayer
    {
        public Task<List<ChartModel>> OrderByProduct();
        
    }
}
