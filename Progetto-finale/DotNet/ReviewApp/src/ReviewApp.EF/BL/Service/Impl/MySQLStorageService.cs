using ReviewApp.Core.BL.Service;
using ReviewApp.Core.Model;
using ReviewApp.EF.Entity;
using ReviewApp.EF.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.EF.BL.Service.Impl
{
    public class MySQLStorageService : IStorageService
    {
        private ApplicationDbContext _context;

        public MySQLStorageService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }

        public List<Review> GetAllReviews()
        {
            List<ReviewEntity> all = _context.Reviews.ToList();
            List<Review> reviews = new();
            foreach (ReviewEntity entity in all)
            {
                Review review = ReviewMapper.From(entity);
                reviews.Add(review);
            }
            return reviews;
        }

        public Review GetReviewById(int id)
        {
            var reviewById = _context.Reviews.Find(id);
            return ReviewMapper.From(reviewById);
        }

        public Review AddReview(int userId, int movieId, string recensione)
        {
            ReviewEntity reviewToAdd = new ReviewEntity()
            {
                Id = GetNextReviewId(),
                userId = userId,
                movieId = movieId,
                recensione = recensione
            };

            _context.Add(reviewToAdd);
            _context.SaveChanges();
            return ReviewMapper.From(reviewToAdd);
        }

        public Review UpdateReview(int id, string recensione)
        {
            var reviewToUpdate = _context.Reviews.Find(id);
            {
                reviewToUpdate.recensione = recensione;
            }

            _context.Update(reviewToUpdate);
            _context.SaveChanges();

            return ReviewMapper.From(reviewToUpdate);
        }

        public bool DeleteReview(int id)
        {
            var reviewToDelete = _context.Reviews.Find(id);
            _context.Remove(reviewToDelete);
            _context.SaveChanges();

            ReviewMapper.From(reviewToDelete);
            return true;
        }

        private int GetNextReviewId()
        {
            if (_context.Reviews.Count() == 0) return 1;
            return _context.Reviews.Select(c => c.Id).Max() + 1;
        }
    }
}
