import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenavModule

import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersListComponent } from './component/users-list/users-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { TweetsComponent } from './component/tweets/tweets.component';
import { TweetComponent } from './component/tweets/tweet/tweet.component';
import { ProfileComponent } from './component/profile/profile.component';

import { TokenInterceptor } from './interceptor/interceptor';
import { SpinnerComponent } from './modules/shared/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,

    HomePageComponent,
    EditProfileComponent,
    UsersListComponent,
    SidebarComponent,
    HomeComponent,
    SearchComponent,
    TweetsComponent,
    TweetComponent,
    ProfileComponent,
  ],
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
