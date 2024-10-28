using cpr_react.Server.Persistence;
using cpr_react.Server.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using cpr_react.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ChamadoService>();
builder.Services.AddScoped<EstoqueService>();
builder.Services.AddScoped<ConsignadoService>();
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<CPRDbContext>(options =>
options.UseSqlServer("name=ConnectionStrings:CPRConnectionString"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("https://${dynamicIP}:5173", "https://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials());
});

var app = builder.Build();

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChamadoHub>("/chamado")
    .RequireCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

    app.MapFallbackToFile("/index.html");


app.Run();

