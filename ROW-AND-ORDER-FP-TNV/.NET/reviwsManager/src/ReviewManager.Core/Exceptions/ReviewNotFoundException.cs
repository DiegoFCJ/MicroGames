using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReviewsSvc.Core.Exceptions
{
    public class ReviewNotFoundException : Exception
    {
        public ReviewNotFoundException(int id) : base($"There's no comment with such id {id}")
        {

        }
    }
}
