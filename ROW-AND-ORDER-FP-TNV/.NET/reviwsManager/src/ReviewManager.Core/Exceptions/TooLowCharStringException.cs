using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.Core.Exceptions
{
    public class TooLowCharStringException : Exception
    {
        public TooLowCharStringException(int charCount) : base($"The string needs {10 - charCount} more characters to be approved")
        {

        }
    }
}
