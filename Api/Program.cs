using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<OrderContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("MyDbContext")));
builder.Services.AddScoped<IOrderRepository, OrderRepository>(); // register repository layer

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://orders-application.vercel.app")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Configure JWT authentication
// Bind JWT settings from configuration
var jwtSettings = new JwtSettings();
builder.Configuration.Bind("Jwt", jwtSettings);
var supabaseSignatureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
var validIssuer = "https://hfhrezvxbnkvvkujmswp.supabase.co/auth/v1";
var validAudiences = new List<string>() { "authenticated" };
builder.Services.AddAuthentication().AddJwtBearer(o =>
{   
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = supabaseSignatureKey,
        ValidAudiences = validAudiences,
        ValidIssuer = validIssuer
    };
});

var app = builder.Build();
app.UseSwagger();
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication(); // Add this line to enable authentication middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
