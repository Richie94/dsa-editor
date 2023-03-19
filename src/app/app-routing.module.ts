import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroNotesComponent } from './hero-notes/hero-notes.component';
import { HeroesComponent } from './heroes/heroes.component';
import {HeroGeneralComponent} from "./hero-general/hero-general.component";

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'general/:id', component: HeroGeneralComponent },
  { path: 'notes/:id', component: HeroNotesComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
