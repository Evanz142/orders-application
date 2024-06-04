// Repositories/IOrderRepository.cs
using Api.Dtos;
using Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Repositories
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders(CancellationToken cancellationToken);
        Task<IEnumerable<BarChartDataDto>> GetBarData(CancellationToken cancellationToken);
        Task<IEnumerable<LineChartDataDto>> GetChartData(CancellationToken cancellationToken);
        Task<IEnumerable<PieChartDataDto>> GetPieData(CancellationToken cancellationToken);
        Task<Order> GetOrderById(string id);
        Task<IEnumerable<Order>> GetOrdersByType(CancellationToken cancellationToken, OrderTypes type);
        Task<IEnumerable<Order>> GetOrdersByString(CancellationToken cancellationToken, string searchString);
        Task<IEnumerable<Order>> SearchOrders(CancellationToken cancellationToken, string? searchString, string? orderTypes, string? startDate, string? endDate);
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder(string id);
        Task<bool> OrderExists(string id);
    }
}
