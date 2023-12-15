using ReviewApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.Core.BL.Service
{
    public interface IStorageService
    {
        List<Review> GetAllReviews();
        Review GetReviewById(int id);
        Review AddReview(int userId, int movieId, string recensione);
        Review UpdateReview(int id, string recensione);
        bool DeleteReview(int id);
    }
}
