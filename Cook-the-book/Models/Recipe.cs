namespace Cook_the_book.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Ingridiants { get; set; }

        public string Instructions { get; set; }

        public List<string> Pictures { get; set; }

        public List<string> KeyWords { get; set; }
    }
}
