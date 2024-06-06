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
builder.Services.AddScoped<IOrderRepository, OrderRepository>(); // Register repository layer (using scoped)

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => // Add CORS for my two URLS
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(
                "http://localhost:5173",
                "https://orders-application.vercel.app")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// ------ JWT AUTH ------

// Bind JWT settings from configuration
var jwtSettings = new JwtSettings();
builder.Configuration.Bind("Jwt", jwtSettings);

var supabaseSignatureKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)); // Supabase's key for verification 
var validIssuer = "https://hfhrezvxbnkvvkujmswp.supabase.co/auth/v1";
var validAudiences = new List<string>() { "authenticated" };
builder.Services.AddAuthentication().AddJwtBearer(o => // Add the authentication to the builder
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

app.UseAuthentication(); // Enable authentication middleware
app.UseAuthorization();

app.MapControllers();

app.Run();
