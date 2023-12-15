using ReviewsSvc.DB.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using ReviewsSvc.Core.Model;

namespace ReviewsSvc.DB.Mapper
{
    public class ReviewsEntityMapper
    {
        public static ReviewEnt From(ReviewsEntity entity)
        {
            return new ReviewEnt (entity.Id, entity.UserId, entity.MovieId, entity.Review);
        }
    }
}
