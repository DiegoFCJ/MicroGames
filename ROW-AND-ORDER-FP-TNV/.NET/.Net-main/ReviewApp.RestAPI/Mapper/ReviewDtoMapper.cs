using System;
using ReviewApp.Core.Model;
using ReviewApp.RestAPI.Model;

namespace ReviewApp.RestAPI.Mapper
{
    public class ReviewDtoMapper
    {

        public static ReviewDto From(Review r) => new ReviewDto
        {
            Id = r.Id,
            Comment = r.Comment,
            UserId = r.UserId,
            MovieId = r.MovieId,
            Rating = r.Rating
        };

    }
}

