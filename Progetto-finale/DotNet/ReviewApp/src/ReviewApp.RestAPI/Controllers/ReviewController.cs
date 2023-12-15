using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ReviewApp.Core.BL;
using ReviewApp.Core.BL.Service;
using ReviewApp.Core.Model;
using ReviewApp.RestAPI.Mapper;
using ReviewApp.RestAPI.Model;

namespace ReviewApp.RestAPI.Controllers;

[ApiController]
[Route("api/review")]
public class ReviewController : ControllerBase
{
    ApplicationManager _applicationManager;

    public ReviewController(IStorageService storageservice)
    {
        _applicationManager = new ApplicationManager(storageservice);
    }

    [EnableCors("Policy1")]
    [HttpGet]
    public ActionResult<List<ReviewContract>> GetAllReviews()
    {
        var reviews = _applicationManager.GetAllReviews().Select(c => ReviewContractMapper.From(c));
        return Ok(_applicationManager.GetAllReviews());
    }

    // Creazione review
    [EnableCors("Policy1")]
    [HttpPost]
    public ActionResult<ReviewContract> AddReview([FromBody] UpdateReviewContract info)
    {
        try
        {
            var reviewToAdd = _applicationManager.AddReview(info.userId, info.movieId, info.recensione);
            return Ok(ReviewContractMapper.From(reviewToAdd));
        }
        catch (ReviewTroppoLungaException ex)
        {
            var errorMessage = new ErrorResponse()
            {
                Message = $"La recensione deve essere al massimo di {Review.MAX_CHAR_REVIEW} caratteri"
            };
            return NotFound(errorMessage);
        }
    }


    [HttpGet]
    [Route("{recensione-id}")]
    public ActionResult<ReviewContract> GetReviewById([FromRoute(Name = "recensione-id")] int reviewId)
    {
        try
        {
            var review = _applicationManager.GetAllReviews().First(r => r.Id == reviewId);
            return Ok(ReviewContractMapper.From(review));
        }
        catch (Exception ex)
        {
            var errorMessage = new ErrorResponse()
            {
                Message = $"Non esiste nessuna recensione con id {reviewId}"
            };
            return NotFound(errorMessage);
        }
    }

    [HttpDelete]
    [Route("{recensione-id}")]
    public ActionResult<ReviewContract> DeleteReviewById([FromRoute(Name = "recensione-id")] int reviewId)
    {
        try
        {
            var review = _applicationManager.GetAllReviews().First(r => r.Id == reviewId);
            var reviewDeleted = _applicationManager.DeleteReview(reviewId);
            return Ok(ReviewContractMapper.From(review));
        }
        catch (Exception ex)
        {
            var errorMessage = new ErrorResponse()
            {
                Message = $"Non esiste nessuna recensione con id {reviewId}"
            };

            return NotFound(errorMessage);
        }
    }

    [HttpPatch]
    [Route("{recensione-id}")]
    public ActionResult<ReviewContract> UpdateReviewById([FromRoute(Name = "recensione-id")] int reviewId, [FromBody] UpdateReviewContract info)
    {
        try
        {
            var updatedReview = _applicationManager.UpdateReview(reviewId, info.recensione);
            return Ok(ReviewContractMapper.From(updatedReview));
        }
        catch (Exception ex)
        {
            var errorMessage = new ErrorResponse()
            {
                Message = $"Non esiste nessuna recensione con id {reviewId}"
            };

            return NotFound(errorMessage);
        }
    }
}
