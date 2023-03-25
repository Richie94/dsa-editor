import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../shared/services/hero.service';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    heroService: HeroService,
    authService: AuthService,
  ) {
    super(route, authService, heroService);
  }

  attributeColumns: string[] = ['name', 'probe', 'fw'];

}
