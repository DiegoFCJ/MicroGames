using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReviewApp.DB.Model
{
    [Table("comment")]
    public class ReviewEntity
    {
        [Column("id"), Key]
        public int Id { get; set; }

        [Column("comment"), StringLength(160), DataType(DataType.Text)]
        public string Comment { get; set; } = "";

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("movie_id")]
        public int MovieId { get; set; }

        [Column("rating")]
        public int Rating { get; set; }
    }
}

