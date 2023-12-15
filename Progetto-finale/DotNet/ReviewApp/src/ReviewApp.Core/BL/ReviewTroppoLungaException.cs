using System.Runtime.Serialization;

namespace ReviewApp.Core.BL
{
    [Serializable]
    public class ReviewTroppoLungaException : Exception
    {
        public ReviewTroppoLungaException()
        {
        }

        public ReviewTroppoLungaException(string? message) : base(message)
        {
        }

        public ReviewTroppoLungaException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected ReviewTroppoLungaException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}