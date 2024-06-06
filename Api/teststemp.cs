using Api.Models;
using Api.Repositories;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace OrderApiTestProject;

public class Tests
{
   private readonly OrderContext _context;
        private readonly OrderRepository _repository;

        public Tests()
        {
            var options = new DbContextOptionsBuilder<OrderContext>() // set up in memory database for testing purposes
                .UseInMemoryDatabase(databaseName: "OrderDatabase")
                .Options;

            _context = new OrderContext(options);
            _repository = new OrderRepository(_context);

            SeedDatabase();
        }

        private void SeedDatabase()
        {
            _context.Orders.AddRange(
                new Order { Id = "1", OrderType = OrderTypes.Standard, CustomerName = "Alice", CreatedByUsername = "alice123", CreatedDate = new DateTime(2023, 5, 1) },
                new Order { Id = "2", OrderType = OrderTypes.SaleOrder, CustomerName = "Bob", CreatedByUsername = "bob456", CreatedDate = new DateTime(2023, 5, 2) }
            );
            _context.SaveChanges();
        }

        [Fact]
        public async Task GetAllOrders_ShouldReturnAllOrders()
        {
            var result = await _repository.GetAllOrders(CancellationToken.None);

            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetOrderById_ShouldReturnCorrectOrder()
        {
            var result = await _repository.GetOrderById("1");

            Assert.NotNull(result);
            Assert.Equal("Alice", result.CustomerName);
        }

        [Fact]
        public async Task GetBarData_ShouldReturnCorrectData()
        {
            var result = await _repository.GetBarData(CancellationToken.None);

            Assert.Single(result);
            Assert.Equal("Standard", result.First().Label);
            Assert.Equal(1, result.First().Data.First());
        }

        // Testing is incomplete - need to add more unit tests for the rest of the endpoints
}