import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { EmailActivatedComponent } from './pages/email-activated/email-activated.component';
import { PasswordRecoveryComponent } from './pages/forgot-password/password-recovery.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'review', component: ReviewPageComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sign', component: SignPageComponent },
  { path: 'activation/:token', component: EmailActivatedComponent},
  { path: 'forgotPassword/:id/:email/:token', component: PasswordRecoveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
