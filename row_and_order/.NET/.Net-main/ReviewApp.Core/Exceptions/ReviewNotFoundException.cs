using System;
namespace ReviewApp.Core.Exceptions
{
    public class ReviewNotFoundException : Exception
    {
        public ReviewNotFoundException(int reviewId) : base($"Non è stato trovato nessun commento con id: {reviewId}")
        {
        }
    }
}

