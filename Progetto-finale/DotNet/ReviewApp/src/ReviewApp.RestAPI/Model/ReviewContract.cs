namespace ReviewApp.RestAPI.Model
{
    public class ReviewContract
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int movieId { get; set; }

        public string recensione { get; set; }
    }
}
