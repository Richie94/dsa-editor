import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from "../../shared/model/hero";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";

@Component({
  selector: 'app-hero-fight',
  templateUrl: './hero-fight.component.html',
  styleUrls: ['./hero-fight.component.scss']
})
export class HeroFightComponent implements OnInit, OnDestroy {

  hero: Hero | undefined;
  private origHero: Hero | undefined;
  saveSubscription: Subscription

  fightTechniqueAttributeColumns: string[] = ["name", "ktw", "at", "pa"]
  weaponAttributeColumns: string[] = ["name", "technique", "tp", "at", "pa", "reach", "barrier"]

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) {
    this.saveSubscription = heroService.shouldSave.subscribe(() => {
      this.saveHero()
    })
  }

  ngOnInit(): void {
    this.getHero();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.saveSubscription.unsubscribe();
    this.saveHero()
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero
        // clone the nested objects
        this.origHero = JSON.parse(JSON.stringify(hero))
      });
  }

  saveHero(): void {
    if (this.hero && JSON.stringify(this.hero) !== JSON.stringify(this.origHero)) {
      console.log("Save general")
      this.heroService.updateHero(this.hero)
    } else {
      console.log("Skip save general")
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

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
