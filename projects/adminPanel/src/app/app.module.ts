import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


/* THIRD PARTY LIBRARY */
import { NgxSpinnerModule } from "ngx-spinner";
import {MessagesModule} from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {TooltipModule} from 'primeng/tooltip';

/* SERVICES */
import { RoutingGuardGuard } from './services/routing-guard.guard';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MessagesModule,
    MessageModule,
    TooltipModule
  ],
  providers: [RoutingGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
