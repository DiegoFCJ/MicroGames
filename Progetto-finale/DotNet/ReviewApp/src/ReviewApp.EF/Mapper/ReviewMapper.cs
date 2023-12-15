using ReviewApp.Core.Model;
using ReviewApp.EF.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.EF.Mapper
{
    public class ReviewMapper
    {
        public static Review From(ReviewEntity reviewEntity)
        {
            return new()
            {
                Id = reviewEntity.Id,
                UserId = reviewEntity.userId,
                MovieId = reviewEntity.movieId,
                Recensione = reviewEntity.recensione
            };
        }
    }
}
