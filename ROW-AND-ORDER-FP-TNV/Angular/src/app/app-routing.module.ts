import { SignInUpComponent } from './@shared/sign-in-up/sign-in-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { RankingComponent } from './components/ranking-bestPlayers/ranking-bestPlayers.component';
import { RankingBestGamesComponent } from './components/ranking-best-games/ranking-best-games.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'game-page', component: GamePageComponent },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'ranking-bestPlayers', component: RankingComponent },
  { path: 'ranking-bestGames', component: RankingBestGamesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign', component: SignInUpComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
