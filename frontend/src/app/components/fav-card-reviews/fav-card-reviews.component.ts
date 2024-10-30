import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class FavCardReviewsComponent implements OnInit, AfterViewInit {
  @Input() c!: Function;
  @Input() movieElement: any;
  commentForDB!: Comment;
  userIdLogged!: number;
  comments!: Comment[];
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(
    protected commentServ: CommentService,
    protected authServ: AuthService) { }

  ngOnInit() {
    this.userIdLogged = this.authServ.getCurrentUser().id;
  }

  ngAfterViewInit(): void {
    this.getAllByMovieId(this.movieElement.id);
    this.scrollToBottom();
  }

  getAllByMovieId(movieId: number){
    if(movieId){
      this.commentServ.readByMovieId(movieId).subscribe({
        next: (value) => {
            console.log(value);
            if(value){
              this.comments = value;
            }
        },
        error: (error) => {
            
        }
      })
    }
  }

  saveCommentFromForm(el: NgForm) {
    if (el.valid) {
      this.prepareCommentForSaving(el);
      this.commentServ.saveComment(this.commentForDB).subscribe(() => {
        // Aggiungi il nuovo commento alla lista visualizzata
        this.comments.push(this.commentForDB);
        // Resetta il form dopo aver aggiunto il commento
        el.resetForm();
        // Scrolla verso il nuovo commento aggiunto
        this.scrollToBottom();
      });
    }
  }
  
  
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error(err);
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