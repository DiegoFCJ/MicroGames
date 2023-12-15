using System;
using ReviewApp.Core.Model;

namespace ReviewApp.Core.Service
{
    public interface StorageService
    {

        Review CreateReview(string comment, int userId, int movieId, int rating);

        List<Review> GetReview();

        Review UpdateReview(int reviewId, string comment, int userId, int movieId, int rating);

        bool DeleteReview(int reviewId);

        Review GetReview(int reviewId);

    }
}

