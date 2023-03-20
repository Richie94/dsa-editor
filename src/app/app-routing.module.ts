import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroDetailComponent} from './hero/hero-detail/hero-detail.component';
import {HeroNotesComponent} from './hero/hero-notes/hero-notes.component';
import {HeroesComponent} from './hero/herolist/heroes.component';
import {HeroGeneralComponent} from "./hero/hero-general/hero-general.component";
import {HeroComponent} from "./hero/hero.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {SignInComponent} from "./sign-in/sign-in/sign-in.component";

const routes: Routes = [
  {path: '', redirectTo: '/hero', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {
    path: 'hero', component: HeroComponent, canActivate: [AuthGuard],
    children: [
      {path: 'detail/:id', component: HeroDetailComponent, title: "Talente", canActivate: [AuthGuard]},
      {path: 'general/:id', component: HeroGeneralComponent, title: "Allgemein",  canActivate: [AuthGuard]},
      {path: 'notes/:id', component: HeroNotesComponent, title: "Notizen",  canActivate: [AuthGuard]},
      {path: '', component: HeroesComponent, title: "Überblick",  canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
