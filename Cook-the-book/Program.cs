using Cook_the_book.Data;
using Cook_the_book.Service.Interfaces;
using Cook_the_book.Service;
using Microsoft.Extensions.Configuration;
using Cook_the_book.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IRecipeService, RecipeService>();
builder.Services.AddSingleton<AppDbContext>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return new AppDbContext(config);
});
builder.Services.AddScoped<IImgbbService, ImgbbService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.UseAuthorization();
app.MapControllers();
app.Run();
