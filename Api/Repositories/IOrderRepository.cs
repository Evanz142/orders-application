// Repositories/IOrderRepository.cs
using Api.Dtos;
using Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<BarChartDataDto>> GetBarData();
        Task<IEnumerable<LineChartDataDto>> GetChartData();
        Task<IEnumerable<PieChartDataDto>> GetPieData();
        Task<Order> GetOrderById(string id);
        Task<IEnumerable<Order>> GetOrdersByType(OrderTypes type);
        Task<IEnumerable<Order>> GetOrdersByString(string searchString);
        Task<IEnumerable<Order>> SearchOrders(string searchString, OrderTypes? orderType);
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(string id);
        Task<bool> OrderExists(string id);
    }
}
