using ReviewsSvc.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.Core.Service
{
    public interface IStorageService
    {
        ReviewEnt CreateReview(string review);

        ReviewEnt GetReview(int review_id);

        List<ReviewEnt> GetAllReviews();

        ReviewEnt UpdateReview(int review_id, string review);

        bool DeleteReview(int review_id);



       
    }
}
