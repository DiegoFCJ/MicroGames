
using ReviewsSvc.DB.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.DB
{
    public class AppContext : DbContext
    {
        public DbSet<ReviewsEntity> Reviews { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var version = new MySqlServerVersion(new Version(8, 0, 28));
            var connectionString = "Server=localhost;Port=3306;Database=rowordproj;Uid=root;Pwd=1q2w3e4r5t";


            optionsBuilder.UseMySql(connectionString, version);

            base.OnConfiguring(optionsBuilder);
        }
    }
}
