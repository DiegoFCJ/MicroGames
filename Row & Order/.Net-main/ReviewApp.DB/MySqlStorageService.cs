using System;
using ReviewApp.Core.Exceptions;
using ReviewApp.Core.Model;
using ReviewApp.Core.Service;
using ReviewApp.DB.Mapper;
using ReviewApp.DB.Model;

namespace ReviewApp.DB
{
    public class MySqlStorageService : StorageService
    {
        private ApplicationContext _context;

        public MySqlStorageService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }

        public Review CreateReview(string comment, int userId, int movieId, int rating)
        {
            var reviewToCreate = new ReviewEntity
            {
                Comment = comment,
                UserId = userId,
                MovieId = movieId,
                Rating = rating
            };
            _context.Reviews.Add(reviewToCreate);
            _context.SaveChanges();

            return ReviewEntityMapper.From(reviewToCreate);

        }

        public bool DeleteReview(int reviewId)
        {
            var reviewToDelete = GetReviewOrFail(reviewId);
            _context.Reviews.Remove(reviewToDelete);
            _context.SaveChanges();
            return true;
        }

        public List<Review> GetReview() =>
            _context.Reviews.Select(reviewEntry => ReviewEntityMapper.From(reviewEntry)).ToList();

        public Review GetReview(int reviewId)
        {
            var r = GetReviewOrFail(reviewId);
            return ReviewEntityMapper.From(r);
        }

        public Review UpdateReview(int reviewId, string comment, int userId, int movieId, int rating)
        {
            var reviewToUpdate = GetReviewOrFail(reviewId);
            reviewToUpdate.Comment = comment;
            reviewToUpdate.UserId = userId;
            reviewToUpdate.MovieId = movieId;
            reviewToUpdate.Rating = rating;
            _context.SaveChanges();
            return ReviewEntityMapper.From(reviewToUpdate);
        }

        private ReviewEntity GetReviewOrFail(int reviewId)
        {
            var r = _context.Reviews.Find(reviewId);

            if (r == null) throw new ReviewNotFoundException(reviewId);
            return r;
        }

        

    }
}

