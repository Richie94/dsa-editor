import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";

@Component({
  selector: 'app-hero-fight',
  templateUrl: './hero-fight.component.html',
  styleUrls: ['./hero-fight.component.scss']
})
export class HeroFightComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    heroService: HeroService,
  ) {
    super(route, heroService);
  }

  fightTechniqueAttributeColumns: string[] = ["name", "ktw", "at", "pa"]
  weaponAttributeColumns: string[] = ["name", "technique", "tp", "at", "pa", "reach", "barrier"]

  newSpecialFightAbility() {
    if (this.hero) {
      this.hero.special_fight_abilities.push("")
    }
  }

  removeSpecialFightAbility(index: number) {
    if (this.hero) {
      this.hero.special_fight_abilities.splice(index, 1)
    }
  }

  newWeapon() {
    if (this.hero) {
      this.hero.weapons.push({
        name: "",
        technique: "",
        tp: "",
        at: 0,
        pa: 0,
        reach: "",
        barrier: "",
      })
    }
  }

  removeWeapon(index: number) {
    if (this.hero) {
      this.hero.weapons.splice(index, 1)
    }
  }
}
