using System;
using ReviewApp.Core.Model;
using ReviewApp.DB.Model;

namespace ReviewApp.DB.Mapper
{
    public class ReviewEntityMapper
    {
        public static Review From(ReviewEntity entity)
        {
            return new Review(entity.Id, entity.Comment, entity.UserId, entity.MovieId, entity.Rating);
        }
    }
}

