namespace Api.Models;

public enum OrderTypes
{
    None,
    Standard,
    SaleOrder,
    PurchaseOrder,
    TransferOrder,
    ReturnOrder
}

public class Order
{
    public string? Id { get; set; }
    public OrderTypes OrderType {get; set; }
    public string? CustomerName { get; set; }
    public DateTime CreatedDate { get; set; }
    public string? CreatedByUsername {get; set; }
}