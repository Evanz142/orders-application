// Repositories/OrderRepository.cs
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
}
