// Controllers/OrdersController.cs
using Microsoft.AspNetCore.Mvc;
using Api.Dtos;
using Api.Models;
using Api.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repository;

        public OrdersController(IOrderRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(CancellationToken cancellationToken)
        {
            return Ok(await _repository.GetAllOrders(cancellationToken));
        }

        [HttpGet("BarData")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BarChartDataDto>>> GetBarData(CancellationToken cancellationToken)
        {
            var barData = await _repository.GetBarData(cancellationToken);
            return Ok(barData);
        }

        [HttpGet("ChartData")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<LineChartDataDto>>> GetChartData(CancellationToken cancellationToken)
        {
            var chartData = await _repository.GetChartData(cancellationToken);
            return Ok(chartData);
        }

        [HttpGet("PieData")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<PieChartDataDto>>> GetPieData(CancellationToken cancellationToken)
        {
            var pieData = await _repository.GetPieData(cancellationToken);
            return Ok(pieData);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Order>> GetOrder(CancellationToken cancellationToken, string id)
        {
            var order = await _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> PutOrder(Order order)
        {
            try
            {
                await _repository.UpdateOrder(order);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _repository.OrderExists(order.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await _repository.AddOrder(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var order = await _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            await _repository.DeleteOrder(id);
            return NoContent();
        }

        [HttpGet("ByType/{type}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByType(CancellationToken cancellationToken, OrderTypes type)
        {
            return Ok(await _repository.GetOrdersByType(cancellationToken, type));
        }

        [HttpGet("ByString/{string}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByString(CancellationToken cancellationToken, string searchString)
        {
            return Ok(await _repository.GetOrdersByString(cancellationToken, searchString));
        }

        [HttpGet("Search")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> SearchOrders(CancellationToken cancellationToken, string? searchString = "", OrderTypes? orderType = null, string? startDate = "", string? endDate = "")
        {
            return Ok(await _repository.SearchOrders(cancellationToken, searchString, orderType, startDate, endDate));
        }
    }
}
