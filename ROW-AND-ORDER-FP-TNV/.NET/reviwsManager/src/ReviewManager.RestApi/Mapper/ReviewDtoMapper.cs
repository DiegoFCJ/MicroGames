using ReviewsSvc.Core.Model;
using ReviewsSvc.RestApi.Model;

namespace ReviewsSvc.RestApi.Mapper
{
    public class ReviewDtoMapper
    {
        public static ReviewDto From(ReviewEnt c) => new ReviewDto
        {
            Review_id = c.ReviewId,
            User_id = c.User_Id,
            Movie_id = c.Movie_id,
            Review = c.Review
        };

    }
}
