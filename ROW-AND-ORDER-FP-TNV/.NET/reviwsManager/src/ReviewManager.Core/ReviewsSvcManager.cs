using ReviewsSvc.Core.Exceptions;
using ReviewsSvc.Core.Service;
using ReviewsSvc.Core.Model;
using System.Xml.Linq;

namespace ReviewsSvc.Core;
public class ReviewsSvcManager{
   
    IStorageService _storageService;
    public ReviewsSvcManager(IStorageService storageService)
    {
        _storageService = storageService;
    }

    public bool IsReviewListEmpty() => GetAllReviews().Count == 0;

    public ReviewEnt CreateReview(string review)
    {
        if (review.Length < 10) throw new TooLowCharStringException(review.Length);
        return _storageService.CreateReview(review);
    }
    public List<ReviewEnt> GetAllReviews() => _storageService.GetAllReviews();

    public ReviewEnt GetReview(int reviewId) => _storageService.GetReview(reviewId);

    public ReviewEnt UpdateReview(int reviewId, string review)
    {
        if (review.Length < 10) throw new TooLowCharStringException(review.Length);
        return _storageService.UpdateReview(reviewId, review);
    }

    public bool DeleteReview(int reviewId) => _storageService.DeleteReview(reviewId);
    
}
