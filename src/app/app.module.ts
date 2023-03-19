import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {AddNewHeroDialog, HeroesComponent} from './herolist/heroes.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { HeroNotesComponent } from './hero/hero-notes/hero-notes.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider'
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import { HeroGeneralComponent } from './hero/hero-general/hero-general.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    AddNewHeroDialog,
    HeroComponent,
    HeroGeneralComponent,
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
    MatTableModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
