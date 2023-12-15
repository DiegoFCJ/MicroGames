using System;
namespace ReviewApp.Core.Exceptions
{
    public class IncorrectRatingException : Exception
    {
        public IncorrectRatingException() :
            base($"Il voto deve essere compreso tra 1 e 5")
        {
        }
    }
}

