using Storage.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Repositories
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base()
        {

        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
