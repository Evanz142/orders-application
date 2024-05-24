using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderContext _context;

        public OrdersController(OrderContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // PUT: api/Orders/5
        [HttpPut]
        public async Task<IActionResult> PutOrder(Order order)
        {

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                /*
                if (!OrderExists(order.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
                */
                return NotFound();
            }

            return NoContent();
        }

        /*
        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        */

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            //Console.WriteLine(order.Id);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("PostOrder", new { id = order.Id }, order);
            return CreatedAtAction(nameof(PostOrder), new { id = order.Id }, order);
        }

         // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(string id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Orders/ByType/{type}
        [HttpGet("ByType/{type}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByType(OrderTypes type)
        {
            return await _context.Orders.Where(o => o.OrderType == type).ToListAsync();
        }

        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
