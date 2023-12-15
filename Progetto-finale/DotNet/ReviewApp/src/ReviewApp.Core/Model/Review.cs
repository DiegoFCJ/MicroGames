using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.Core.Model
{
    public class Review
    {
        //private readonly int _id;
        public const int MAX_CHAR_REVIEW = 160;

        public int Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

        public string Recensione { get; set; }
        public Review(int id, int userId, int movieId, string recensione)
        {
            Id = id;
            UserId = userId;
            MovieId = movieId;
            Recensione = recensione;
        }

        public Review()
        {
        }
    }
}
