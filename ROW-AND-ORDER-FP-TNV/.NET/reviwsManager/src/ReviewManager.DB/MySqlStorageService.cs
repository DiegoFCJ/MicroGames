using ReviewsSvc.Core.Exceptions;
using ReviewsSvc.Core.Model;
using ReviewsSvc.DB.Mapper;
using ReviewsSvc.DB.Model;
using ReviewsSvc.Core.Service;

namespace ReviewsSvc.DB;
public class MySqlStorageService : IStorageService
{
    private AppContext _context;

    public MySqlStorageService()
    {
        _context = new();
        _context.Database.EnsureCreated();
    }

    public ReviewEnt CreateReview(string review)
    {
        var reviewToCreate = new ReviewsEntity
        {
            Review = review
        };

        _context.Reviews.Add(reviewToCreate);
        _context.SaveChanges();

        return ReviewsEntityMapper.From(reviewToCreate);
    }

    private ReviewsEntity GetReviewOrFail(int reviewId)
    {
        var c = _context.Reviews.Find(reviewId);

        if (c == null) throw new ReviewNotFoundException(reviewId);
        return c;

    }

    public ReviewEnt GetReview(int review_id)
    {
        var c = GetReviewOrFail(review_id);
        return ReviewsEntityMapper.From(c);
    }

    public List<ReviewEnt> GetAllReviews() =>
        _context.Reviews.Select(reviewEntry => ReviewsEntityMapper.From(reviewEntry)).ToList();

    public ReviewEnt UpdateReview(int review_id, string review)
    {
        var reviewToUpdate = GetReviewOrFail(review_id);
        reviewToUpdate.Review = review;

        _context.SaveChanges();
        return ReviewsEntityMapper.From(reviewToUpdate);
    }

    bool IStorageService.DeleteReview(int review_id)
    {
        var reviewToDelete = GetReviewOrFail(review_id);
        _context.Reviews.Remove(reviewToDelete);
        _context.SaveChanges();

        return true;
    }
}
