using ReviewApp.Core.Model;
using ReviewApp.RestAPI.Model;

namespace ReviewApp.RestAPI.Mapper
{
    public class ReviewContractMapper
    {
        public static ReviewContract From(Review review)
        {
            return new()
            {
                Id = review.Id,
                userId = review.UserId,
                movieId = review.MovieId,
                recensione = review.Recensione
            };
        }
    }
}
