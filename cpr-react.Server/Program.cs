


using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ChamadoService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<CPRDbContext>(options =>
options.UseSqlServer("name=ConnectionStrings:CPRConnectionString"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});



var app = builder.Build();

app.UseCors("AllowAllOrigins");
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

    Console.WriteLine($"Tunnel URL: {Environment.
        GetEnvironmentVariable("VS_TUNNEL_URL")}");
    Console.WriteLine($"API project tunnel URL: {Environment.
        GetEnvironmentVariable("VS_TUNNEL_URL_MyWebApi")}");


    app.UseAuthorization();

    app.MapControllers();

    app.MapFallbackToFile("/index.html");



    app.Run();

