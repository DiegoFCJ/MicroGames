using System;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using ReviewApp.Core;
using ReviewApp.Core.Exceptions;
using ReviewApp.RestAPI.Model;
using ReviewApp.RestAPI.Mapper;

namespace ReviewApp.RestAPI.Controllers
{
    
    /* Tramite le annotation la classe viene identificata come un REST Controller; ad ogni
        metodo viene attribuita una chiamata http e una route.
        Ogni API restituisce, in alternativa: 
            - lo status code 200 e un JSON, in caso di buon fine della richiesta;
            - uno status code della classe 400 e un messaggio di errore (proveniente dalla 
            relativa eccezione) in caso di errori
      */

    [ApiController]
    [Route("reviews")]  
    public class ReviewController : ControllerBase

    {
        private ReviewApplicationManager _manager;

        public ReviewController(ReviewApplicationManager manager)
        {
            _manager = manager;
        }



        [HttpGet]
        public ActionResult<List<ReviewDto>> GetAllReviews() =>
            Ok(_manager.GetAllReviews().Select(r =>
            ReviewDtoMapper.From(r)).ToList());

        [HttpGet]
        [Route("{review-id}")]
        public ActionResult<ReviewDto> GetReviewsById([FromRoute(Name = "review-id")] int reviewId)
        {

            try
            {
                var r = _manager.GetReview(reviewId);
                return Ok(ReviewDtoMapper.From(r));
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new ErrorResponse(e.Message));
            }
        }

        [HttpPost]
        public ActionResult<ReviewDto> CreateReview([FromBody] ReviewRequest body)
        {
            try
            {
                var r = _manager.CreateReview(body.Comment, body.UserId, body.MovieId, body.Rating);
                var uri = $"/reviews/{r.Id}";
                return Created(uri, ReviewDtoMapper.From(r));
            }
            catch (LongCommentException ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }
        [HttpPut]
        [Route("{review-id}")]
        public ActionResult<ReviewDto> UpdateReview(
            [FromRoute(Name = "review-id")] int reviewId,
            [FromBody] ReviewRequest body)
        {
            try
            {
                var r = _manager.UpdateReview(reviewId, body.Comment, body.UserId, body.MovieId, body.Rating);
                return Ok(ReviewDtoMapper.From(r));
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new ErrorResponse(e.Message));
            }

            catch (LongCommentException ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }

        }
        
        [HttpDelete]
        [Route("{review-id}")]
        public ActionResult<ReviewDto> DeleteReview([FromRoute(Name = "review-id")] int reviewId)
        {

            try
            {
                var r = _manager.DeleteReview(reviewId);
                return Ok();
            }
            catch (ReviewNotFoundException e)
            {
                return NotFound(new ErrorResponse(e.Message));
            }
        }

        [HttpGet]
        [Route("fromuser/{user-id}")]
        public ActionResult<List<ReviewDto>> GetReviewsByUserId([FromRoute(Name = "user-id")] int userId) =>
            Ok(_manager.GetReviewsByUserId(userId).Select(r =>
            ReviewDtoMapper.From(r)).ToList());

    }

}

