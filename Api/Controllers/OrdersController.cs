// Controllers/OrdersController.cs
using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return Ok(await _repository.GetAllOrders());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(string id)
        {
            var order = await _repository.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpPut]
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
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await _repository.AddOrder(order);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpDelete("{id}")]
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
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByType(OrderTypes type)
        {
            return Ok(await _repository.GetOrdersByType(type));
        }

        [HttpGet("ByString/{string}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByString(string searchString)
        {
            return Ok(await _repository.GetOrdersByString(searchString));
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Order>>> SearchOrders(string searchString = "", OrderTypes? orderType = null)
        {
            return Ok(await _repository.SearchOrders(searchString, orderType));
        }
    }
}
