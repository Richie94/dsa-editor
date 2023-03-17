import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroNotesComponent } from './hero-notes/hero-notes.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider'
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
