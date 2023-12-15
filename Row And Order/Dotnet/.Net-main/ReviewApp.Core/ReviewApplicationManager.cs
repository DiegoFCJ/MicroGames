using System;
using System.Collections.Generic;
using ReviewApp.Core.Exceptions;
using ReviewApp.Core.Model;
using ReviewApp.Core.Service;

namespace ReviewApp.Core
{
    public class ReviewApplicationManager
    {

        StorageService _storageService;

        public ReviewApplicationManager(StorageService storageService)
        {
            _storageService = storageService;
        }

        public List<Review> GetAllReviews() => _storageService.GetReview();

      

        public Review GetReview(int reviewId) => _storageService.GetReview(reviewId);

        public Review CreateReview(string comment, int userId, int movieId, int rating)
        {
            if (comment.Length > 160) throw new LongCommentException();
            return _storageService.CreateReview(comment, userId, movieId, rating);
        }

        public Review UpdateReview(int id, string updatedComment, int updatedUserId, int updatedMovieId, int updatedRating)
        {
            if (updatedComment.Length > 160) throw new LongCommentException();
            return _storageService.UpdateReview(id, updatedComment, updatedUserId, updatedMovieId, updatedRating);
        }

        public bool DeleteReview(int id) => _storageService.DeleteReview(id);

        public bool IsReviewListEmpty() => GetAllReviews().Count == 0;

        public List<Review> GetReviewsByUserId(int userId)
        {
            var allReviewsList = GetAllReviews();
            List<Review> filteredList = allReviewsList.Where(review => review.UserId == userId).ToList();
            return filteredList;
        }


    }
}

