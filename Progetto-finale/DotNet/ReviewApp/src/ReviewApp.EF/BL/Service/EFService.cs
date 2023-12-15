using ReviewApp.EF.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.EF.BL.Service
{
    public class EFService
    {
        private ApplicationDbContext _context;

        public EFService()
        {
            _context = new();
            _context.Database.EnsureCreated();
        }

        public List<ReviewEntity> GetAllCommenti()
        {
            return _context.Reviews.ToList();
        }

        public ReviewEntity GetReviewById(int id) => _context.Reviews.Find(id);

        public void AddReview(int id, int userId, int movieId, string recensione)
        {
            var reviewToAdd = new ReviewEntity()
            {
                Id = id,
                userId = userId,
                movieId = movieId,
                recensione = recensione
            };

            _context.Add(reviewToAdd);
            _context.SaveChanges();
        }

        public void UpdateReview(int id, string recensione)
        {
            var reviewToUpdate = GetReviewById(id);

            reviewToUpdate.Id = id;
            reviewToUpdate.recensione = recensione;

            _context.SaveChanges();
        }

        public void DeleteReview(int id)
        {
            var reviewToDelete = GetReviewById(id);

            _context.Reviews.Remove(reviewToDelete);
            _context.SaveChanges();
        }
    }
}
