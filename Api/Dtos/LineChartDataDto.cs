// Dtos/LineChartDataDto.cs
namespace Api.Dtos
{
    public class LineChartDataDto
    {
        public string Id { get; set; }
        public string Label { get; set; }
        public List<int> Data { get; set; }
        //public string Stack { get; set; } = "total";
        public string StackOrder {get; set; } = "descending";
        public bool Area { get; set; } = false;
        public bool ShowMark { get; set; } = false;
    }
}
