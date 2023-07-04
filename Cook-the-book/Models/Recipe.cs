using Cook_the_book.Models;

public class Recipe
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Instructions { get; set; }
    public List<string>? Pictures { get; set; }
    public List<string>? KeyWords { get; set; }
    public List<Ingredient>? Ingredients { get; set; }
    public List<Category>? Categories { get; set; }
}