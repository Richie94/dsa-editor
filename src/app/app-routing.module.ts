import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailComponent} from './hero/hero-detail/hero-detail.component';
import {HeroNotesComponent} from './hero/hero-notes/hero-notes.component';
import {HeroesComponent} from './herolist/heroes.component';
import {HeroGeneralComponent} from "./hero/hero-general/hero-general.component";
import {HeroComponent} from "./hero/hero.component";

const routes: Routes = [
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
  {
    path: 'hero', component: HeroComponent,
    children: [
      {path: 'detail/:id', component: HeroDetailComponent, title: "Talente"},
      {path: 'general/:id', component: HeroGeneralComponent, title: "Allgemein"},
      {path: 'notes/:id', component: HeroNotesComponent, title: "Notizen"}
    ]
  },
  {path: 'heroes', component: HeroesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
