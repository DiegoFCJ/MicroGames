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
    PasswordRecoveryComponent
    
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
    CommonModule
  ],
  providers: [
    DecimalPipe,
    NgbHighlight
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
