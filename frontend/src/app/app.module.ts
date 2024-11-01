import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbHighlight, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';

import { NavBeforeLogComponent } from './components/navbars/navbar-before-log/nav-before-log.component';
import { NavAfterLogComponent } from './components/navbars/nav-after-log/nav-after-log.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ButtonComponent } from './components/button/button.component';
import { EmailActivatedComponent } from './pages/email-activated/email-activated.component';
import { PasswordRecoveryComponent } from './pages/forgot-password/password-recovery.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProfileFavoriteComponent } from './components/profile-favorite/profile-favorite.component';
import { FavCardListComponent } from './components/fav-card-list/fav-card-list.component';
import { DataTransferService } from 'src/transfer-services/data-transfer.service';
import { FavSingleCardComponent } from './components/fav-single-card/fav-single-card.component';
import { FavCardReviewsComponent } from './components/fav-card-reviews/fav-card-reviews.component';
import { FavCardStarsComponent } from './components/fav-card-stars/fav-card-stars.component';
import { FavCardDetailsComponent } from './components/fav-card-details/fav-card-details.component';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { FavCardIscorrectComponent } from './components/fav-card-iscorrect/fav-card-iscorrect.component';
import { TopCardsComponent } from './components/top-cards/top-cards.component';
import { RatioComponent } from './components/ratio/ratio.component';
import { FeedsComponent } from './components/feeds/feeds.component';
import { FavProfileCardsComponent } from './components/fav-profile-cards/fav-profile-cards.component';
import { GlobalScoresComponent } from './components/global-scores/global-scores.component';
import { ApxChartComponent } from './components/apx-chart/apx-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GamePageComponent,
    ReviewPageComponent,
    RankingComponent,
    NavBeforeLogComponent,
    NavAfterLogComponent,
    LogoutComponent,
    ProfileComponent,
    ButtonComponent,
    SignPageComponent,
    EmailActivatedComponent,
    PasswordRecoveryComponent,
    ProfileFavoriteComponent,
    FavCardListComponent,
    FavSingleCardComponent,
    FavCardReviewsComponent,
    FavCardStarsComponent,
    FavCardDetailsComponent,
    CloseBtnComponent,
    FavCardIscorrectComponent,
    TopCardsComponent,
    RatioComponent,
    FeedsComponent,
    FavProfileCardsComponent,
    GlobalScoresComponent,
    ApxChartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    NgbRatingModule,
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    NgApexchartsModule,
  ],
  providers: [
    DecimalPipe,
    NgbHighlight,
    DataTransferService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
