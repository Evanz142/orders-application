// Repositories/OrderRepository.cs
using Api.Dtos;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly OrderContext _context;

        public OrderRepository(OrderContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<IEnumerable<BarChartDataDto>> GetBarData()
        {
            var orderTypes = await _context.Orders
                .GroupBy(o => o.OrderType)
                .Select(g => new
                {
                    OrderType = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Process the data in-memory
            var barData = orderTypes
                .Select((g, index) => new BarChartDataDto
                {
                    Data = [g.Count],
                    Label = g.OrderType.ToString()
                })
                .ToList();

            return barData;
        }

        public async Task<IEnumerable<LineChartDataDto>> GetChartData()
        {
            var orders = await _context.Orders
                .Select(o => new
                {
                    o.CreatedByUsername,
                    o.CreatedDate.Year,
                    o.CreatedDate.Month
                })
                .ToListAsync();

            var earliestOrderDate = orders.Min(o => new DateTime(o.Year, o.Month, 1));
            var currentDate = DateTime.Now;

            var months = GetMonthRange(earliestOrderDate, currentDate);

            var chartData = orders
                .GroupBy(o => o.CreatedByUsername)
                .Select(g => new LineChartDataDto
                {
                    Id = g.Key,
                    Label = g.Key,
                    Data = months.Select(m => g.Count(o => o.Year == m.Year && o.Month == m.Month)).ToList()
                })
                .ToList();

            return chartData;
        }

        private List<DateTime> GetMonthRange(DateTime start, DateTime end)
        {
            var months = new List<DateTime>();

            for (var date = new DateTime(start.Year, start.Month, 1); date <= end; date = date.AddMonths(1))
            {
                months.Add(date);
            }

            return months;
        }

        public async Task<IEnumerable<PieChartDataDto>> GetPieData()
        {
            var orders = await _context.Orders
                .GroupBy(o => o.CustomerName)
                .Select(g => new
                {
                    CustomerName = g.Key,
                    OrderCount = g.Count()
                })
                .ToListAsync();

            // Process the data in-memory to create pie chart data
            var pieData = orders
                .Select((g, index) => new PieChartDataDto
                {
                    Id = index,
                    Value = g.OrderCount,
                    Label = g.CustomerName
                })
                .ToList();

            return pieData;
        }

        public async Task<Order> GetOrderById(string id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task<IEnumerable<Order>> GetOrdersByType(OrderTypes type)
        {
            return await _context.Orders.Where(o => o.OrderType == type).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByString(string searchString)
        {
            searchString = searchString.ToLower();
            return await _context.Orders
                .Where(o => o.Id.ToLower().Contains(searchString)
                            || o.CustomerName.ToLower().Contains(searchString)
                            || o.CreatedByUsername.ToLower().Contains(searchString))
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> SearchOrders(string searchString, OrderTypes? orderType)
        {
            IQueryable<Order> query = _context.Orders;

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                searchString = searchString.ToLower();
                query = query.Where(o => o.Id.ToLower().Contains(searchString)
                                          || o.CustomerName.ToLower().Contains(searchString)
                                          || o.CreatedByUsername.ToLower().Contains(searchString));
            }

            if (orderType != 0 && orderType.HasValue)
            {
                query = query.Where(o => o.OrderType == orderType);
            }

            return await query.ToListAsync();
        }

        public async Task AddOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrder(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(string id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> OrderExists(string id)
        {
            return await _context.Orders.AnyAsync(e => e.Id == id);
        }
    }

    public static class EnumerableExtensions
    {
        public static IEnumerable<TSource> Scan<TSource>(this IEnumerable<TSource> source, Func<TSource, TSource, TSource> func)
        {
            using (var iterator = source.GetEnumerator())
            {
                if (!iterator.MoveNext())
                {
                    yield break;
                }

                var current = iterator.Current;
                yield return current;

                while (iterator.MoveNext())
                {
                    current = func(current, iterator.Current);
                    yield return current;
                }
            }
        }
    }
}
