import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";
import {FightTechniqueService} from "../../shared/services/fight-technique.service";
import {FightTechnique} from "../../shared/model/hero";

@Component({
  selector: 'app-hero-fight',
  templateUrl: './hero-fight.component.html',
  styleUrls: ['./hero-fight.component.scss']
})
export class HeroFightComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    authService: AuthService,
    heroService: HeroService,
    private fightTechniqueService: FightTechniqueService,
  ) {
    super(route, authService, heroService);
  }

  fightTechniqueAttributeColumns: string[] = ["name", "ktw", "at", "pa"]
  weaponAttributeColumns: string[] = ["name", "technique", "tp", "at", "pa", "reach", "barrier"]

    getAt(fightTechnique: FightTechnique): number {
      if (this.hero) {
          return this.fightTechniqueService.getAt(fightTechnique, this.hero)
      } else {
        return 0
      }
    }

    getPa(fightTechnique: FightTechnique): number {
        if (this.hero) {
            return this.fightTechniqueService.getPa(fightTechnique, this.hero)
        } else {
            return 0
        }
    }

  newSpecialFightAbility() {
    if (this.hero && !this.readOnly()) {
      this.hero.special_fight_abilities.push("")
    }
  }

  removeSpecialFightAbility(index: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.special_fight_abilities.splice(index, 1)
    }
  }

  newWeapon() {
    if (this.hero && !this.readOnly()) {
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
    if (this.hero && !this.readOnly()) {
      this.hero.weapons.splice(index, 1)
    }
  }

  removeArmor(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.armor.splice(i, 1)
    }
  }

  newArmor() {
    if (this.hero && !this.readOnly()) {
      this.hero.armor.push({
        name: "",
        be: 0,
        mod: "",
        rs: 0
      })
    }
  }

  newShield() {
    if (this.hero && !this.readOnly()) {
      this.hero.shield.push({
        name: "",
        at: 0,
        sp: 0,
        pa: 0
      })
    }
  }

  removeShield(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.shield.splice(i, 1)
    }
  }
}
