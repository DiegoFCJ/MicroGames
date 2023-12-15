using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.Core.Model
{
    public class ReviewEnt
    {
        private int Review_id;
        public int ReviewId
        {
            get { return Review_id; }
            set { Review_id = value; }
        }
        public int User_Id { get; set; }
        public int Movie_id { get; set; }
        public string Review { get; set; }

        public ReviewEnt(int id, int user_id, int movie_id, string review)
        {
            ReviewId = id;
            User_Id = user_id;
            Movie_id = movie_id;
            Review = review;
        }

    }
}