using System.ComponentModel;

namespace ReviewsSvc.RestApi.Model
{
    public class ReviewRequest
    {
        [DisplayName("review")]
        public string Review { get; set; }
    }
}
