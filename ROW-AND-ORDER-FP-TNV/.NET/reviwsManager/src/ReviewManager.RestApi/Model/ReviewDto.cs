using System.ComponentModel;

namespace ReviewsSvc.RestApi.Model
{
    public class ReviewDto
    {
        [DisplayName("review_id")]
        public int Review_id { get; set; }

        [DisplayName("user_id")]
        public int User_id { get; set; }

        [DisplayName("movie_id")]
        public int Movie_id { get; set; }

        [DisplayName("review")]
        public string Review { get; set; }
    }
}
