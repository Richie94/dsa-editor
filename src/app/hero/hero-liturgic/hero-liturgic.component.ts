import {Component} from '@angular/core';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {HeroService} from "../../shared/services/hero.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-hero-liturgic',
  templateUrl: './hero-liturgic.component.html',
  styleUrls: ['./hero-liturgic.component.scss']
})
export class HeroLiturgicComponent extends AbstractHeroComponent {

  constructor(
    heroService: HeroService,
    authService: AuthService,
    route: ActivatedRoute) {
    super(route, authService, heroService);
  }

  addSpell() {
    if (this.hero && !this.readOnly()) {
      this.hero.liturgic_spells.push({
        name: "",
        probe: "",
        spell_duration: "",
        cast_duration: "",
        range: "",
        target: "",
        sf: "",
        cost: ""
      })
    }
  }

  deleteSpell(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.liturgic_spells.splice(i, 1)
    }
  }

}
