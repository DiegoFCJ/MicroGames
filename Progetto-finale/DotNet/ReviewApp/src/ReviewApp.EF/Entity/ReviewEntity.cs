using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.EF.Entity
{
    [Table("Review")]
    public class ReviewEntity
    {
        [Column("id"), Key]
        public int Id { get; set; }
        [Column("userId"), Required]
        public int userId { get; set; }
        [Column("movieId"), Required]
        public int movieId { get; set; }

        [Column("recensione"), Required, StringLength(160), DataType(DataType.Text)]
        public string recensione { get; set; }
    }
}
