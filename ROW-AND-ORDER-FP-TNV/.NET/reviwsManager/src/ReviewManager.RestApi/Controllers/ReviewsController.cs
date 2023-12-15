

using ReviewsSvc.Core.Exceptions;
using ReviewsSvc.RestApi.Model;
using Microsoft.AspNetCore.Mvc;
using ReviewsSvc.Core;
using ReviewsSvc.RestApi.Mapper;

namespace ReviewsSvc.RestApi.Controllers
{
    [ApiController]
    [Route("reviews")]
    public class ReviewsController : ControllerBase
    {

        private ReviewsSvcManager _manager;

        public ReviewsController(ReviewsSvcManager manager)
        {
            _manager = manager;
        }

        [HttpPost]
        public ActionResult<ReviewDto> CreateReview([FromBody] ReviewRequest body)
        {
            try
            {
                var c = _manager.CreateReview(body.Review);
                var uri = $"/reviews/{c.ReviewId}";
                return Created(uri, ReviewDtoMapper.From(c));
            }
            catch (TooLowCharStringException ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }

        [HttpGet]
        public ActionResult<List<ReviewDto>> GetAllReviews() =>
            Ok(_manager.GetAllReviews().Select(c => ReviewDtoMapper.From(c)).ToList());

        [HttpGet]
        [Route("{review-id}")]
        public ActionResult<ReviewDto> GetReview([FromRoute(Name = "review-id")] int review_id)
        {
            try
            {
                var c = _manager.GetReview(review_id);
                return Ok(ReviewDtoMapper.From(c));
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new ErrorResponse(e.Message));
            }
        }

        [HttpPut]
        public ActionResult<ReviewDto> UpdateReview([FromBody] ReviewRequest body, int review_id)
        {
            try
            {
                var reviewToUpdate = _manager.GetReview(review_id);
                var c = _manager.UpdateReview(review_id, body.Review);

                var uri = $"/review/{c.ReviewId}";
                return Created(uri, ReviewDtoMapper.From(c));
            }
            catch (TooLowCharStringException ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }

        [HttpDelete]
        public ActionResult<ReviewDto> DeleteReview(int review_id)
        {
            try
            {
                var reviewToDelete = _manager.GetReview(review_id);
                var c = _manager.DeleteReview(review_id);

                return Accepted(c);
            }
            catch (ReviewNotFoundException ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }
    }

}
