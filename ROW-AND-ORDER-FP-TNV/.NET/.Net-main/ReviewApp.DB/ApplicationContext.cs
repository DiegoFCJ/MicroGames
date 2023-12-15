using System;
using Microsoft.EntityFrameworkCore;
using ReviewApp.DB.Model;

namespace ReviewApp.DB
{
    public class ApplicationContext : DbContext
    {
        public DbSet<ReviewEntity> Reviews { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var version = new MySqlServerVersion(new Version(8, 0, 30));
            var connectionString = "Server=localhost;Port=3306;Database=rowordproj;Uid=root;Pwd=1q2w3e4r5t";

            optionsBuilder.UseMySql(connectionString, version);
            base.OnConfiguring(optionsBuilder);
        }
    }
}

