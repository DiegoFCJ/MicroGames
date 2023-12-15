using ReviewApp.Core.BL.Service;
using ReviewApp.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewApp.Core.BL
{
    public class ApplicationManager
    {
        private IStorageService _storageservice;

        public ApplicationManager(IStorageService storageservice)
        {
            _storageservice = storageservice;
        }

        public List<Review> GetAllReviews() => _storageservice.GetAllReviews();
        public Review AddReview(int userId, int movieId, string recensione)
        {
            if (recensione.Length > Review.MAX_CHAR_REVIEW)
            {
                throw new ReviewTroppoLungaException($"La recensione deve essere al massimo di {Review.MAX_CHAR_REVIEW} caratteri");
            }
            return _storageservice.AddReview(userId, movieId, recensione);
        }
        public Review UpdateReview(int id, string recensione) => _storageservice.UpdateReview(id, recensione);
        
        public bool DeleteReview(int id)
        {
            _storageservice.DeleteReview(id);
            return true;
        }
    }
}
