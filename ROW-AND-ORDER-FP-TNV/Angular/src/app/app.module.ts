import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { LoginComponent } from './@shared/login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './@shared/register/register.component';
import { RankingComponent } from './components/ranking-bestPlayers/ranking-bestPlayers.component';
import { MatTableModule } from '@angular/material/table' 
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './@shared/logout/logout.component';
import { ButtonSignComponent } from './@shared/button-sign/button-sign.component';
import { SignInUpComponent } from './@shared/sign-in-up/sign-in-up.component';
import { NavBeforeLogComponent } from './@shared/nav-before-log/nav-before-log.component';
import { NavAfterLogComponent } from './@shared/nav-after-log/nav-after-log.component';
import { FavouritesCarouselComponent } from './@shared/favourites-carousel/favourites-carousel.component';
import { RankingBestGamesComponent } from './components/ranking-best-games/ranking-best-games.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GamePageComponent,
    ReviewPageComponent,
    LoginComponent,
    RegisterComponent,
    RankingComponent,
    SignInUpComponent,
    ProfileComponent,
    ButtonSignComponent,
    LogoutComponent,
    NavBeforeLogComponent,
    NavAfterLogComponent,
    FavouritesCarouselComponent,
    RankingBestGamesComponent,
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
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
