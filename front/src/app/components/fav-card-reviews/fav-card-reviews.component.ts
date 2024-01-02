import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/models/comment';
import * as Messages from 'src/const-messages/messages';
import { CommentService } from 'src/services/comment.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-fav-card-reviews',
  templateUrl: './fav-card-reviews.component.html',
  styleUrls: ['./fav-card-reviews.component.scss']
})
export class FavCardReviewsComponent implements OnInit {
  @Input() c!: Function;
  @Input() movieElement: any;
  commentForDB!: Comment;

  constructor(
    protected commentServ: CommentService,
    protected authServ: AuthService) { }

  ngOnInit() {
  }

  saveCommentFromForm(el: NgForm) {
    if (el.valid) {
      this.prepareCommentForSaving(el);
      this.commentServ.saveComment(this.commentForDB).subscribe();
    }
  }

  private prepareCommentForSaving(el: NgForm): void {
    this.commentForDB = {
      username: this.authServ.getCurrentUser().username,
      createdAt: new Date(),
      comment: el.form.value.comment,
      movieId: this.movieElement.id,
      userId: this.authServ.getCurrentUser().id,
    };
  }

}
