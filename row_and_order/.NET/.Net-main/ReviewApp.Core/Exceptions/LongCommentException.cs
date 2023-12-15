using System;
namespace ReviewApp.Core.Exceptions
{
    public class LongCommentException : Exception
    {
        public LongCommentException() :
            base($"Lunghezza massima del commento: 160 caratteri")
        {
        }
    }
}

