using Microsoft.EntityFrameworkCore;

namespace Cook_the_book.Data
{
    public class DB_context: DbContext
    {
        public DB_context(DbContextOptions <DB_context>options) : base(options)
        {
            
        }
    }
}
