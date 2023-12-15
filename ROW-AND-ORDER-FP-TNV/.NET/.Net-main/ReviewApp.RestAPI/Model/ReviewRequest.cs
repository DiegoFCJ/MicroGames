using System;
using System.ComponentModel;

namespace ReviewApp.RestAPI.Model
{
    public class ReviewRequest
    {
        [DisplayName("comment")]
        public string Comment { get; set; } = "";

        [DisplayName("user_id")]
        public int UserId { get; set; }

        [DisplayName("movie_id")]
        public int MovieId { get; set; }

        [DisplayName("rating")]
        public int Rating { get; set; }

    }
}

