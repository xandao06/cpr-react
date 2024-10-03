


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

//app.UseHttpsRedirection();

//app.Use(async (context, next) =>
//{
//    try
//    {
//        await next.Invoke();
//    }
//    catch (Exception ex)
//    {
//        // Aqui você pode registrar o erro, se necessário
//        Console.Error.WriteLine($"Erro: {ex.Message}");

//        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
//        await context.Response.WriteAsync("Um erro ocorreu. Tente novamente mais tarde.");
//    }
//});

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/ChamadoIndex.jsx");



app.Run();

