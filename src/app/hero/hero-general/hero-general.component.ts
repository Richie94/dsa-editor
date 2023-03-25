import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-hero-general',
  templateUrl: './hero-general.component.html',
  styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    authService: AuthService,
    heroService: HeroService,
  ) {
    super(route, authService, heroService);
  }

  newAdvantage() {
    if (this.hero && !this.readOnly()) {
      this.hero.advantages.push("")
    }
  }

  newDisadvantage() {
    if (this.hero && !this.readOnly()) {
      this.hero.disadvantages.push("")
    }
  }

  deleteDisadvantage(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.disadvantages.splice(i, 1)
    }
  }

  deleteAdvantage(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.advantages.splice(i, 1)
    }
  }
}
