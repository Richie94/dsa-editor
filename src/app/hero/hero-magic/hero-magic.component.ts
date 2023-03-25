import {Component} from '@angular/core';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {HeroService} from "../../shared/services/hero.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hero-magic',
  templateUrl: './hero-magic.component.html',
  styleUrls: ['./hero-magic.component.scss']
})
export class HeroMagicComponent extends AbstractHeroComponent {

  constructor(heroService: HeroService, route: ActivatedRoute) {
    super(route, heroService);
  }

  addSpell() {
    if (this.hero) {
      this.hero.magic_spells.push({
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
    if (this.hero) {
      this.hero.magic_spells.splice(i, 1)
    }
  }

}
