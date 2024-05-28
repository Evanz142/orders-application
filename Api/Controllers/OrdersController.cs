using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Microsoft.CodeAnalysis.Elfie.Serialization;

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
                
                if (!OrderExists(order.Id))
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

        // GET: api/Orders/ByString/{string}
        [HttpGet("ByString/{string}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByString(String searchString)
        {
            searchString = searchString.ToLower();

            // Filter orders based on the search criteria
            var matchingOrders = await _context.Orders
                .Where(o => o.Id.ToLower().Contains(searchString)
                    || o.CustomerName.ToLower().Contains(searchString)
                    || o.CreatedByUsername.ToLower().Contains(searchString))
                .ToListAsync();

            return matchingOrders;
        }

        // GET: api/Orders/Search
        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<Order>>> SearchOrders(string searchString = "", OrderTypes? orderType = null)
        {
            IQueryable<Order> query = _context.Orders;

            // Apply search by string if searchString is provided
            if (!string.IsNullOrWhiteSpace(searchString))
            {
                searchString = searchString.ToLower();
                query = query.Where(o => o.Id.ToLower().Contains(searchString)
                    || o.CustomerName.ToLower().Contains(searchString)
                    || o.CreatedByUsername.ToLower().Contains(searchString));
            }

            // Apply search by orderType if orderType is provided
            if (orderType != 0 && orderType.HasValue)
            {
                query = query.Where(o => o.OrderType == orderType);
            }

            // Execute the query and return the matching orders
            var matchingOrders = await query.ToListAsync();
            return matchingOrders;
        }


        private bool OrderExists(string id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
