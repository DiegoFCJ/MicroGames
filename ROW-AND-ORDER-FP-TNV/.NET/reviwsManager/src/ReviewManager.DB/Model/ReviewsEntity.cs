using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.DB.Model
{
    [Table("reviews")]
    public class ReviewsEntity
    {
        [Column("review_id"), Key]
        public int Id { get; set; }


        [Column("movie_id")]
        public int MovieId { get; set; }


        [Column("user_id")]
        public int UserId { get; set; }


        [Column("review"), MinLength(10), DataType(DataType.Text)]
        public string Review { get; set; }
    }
}
