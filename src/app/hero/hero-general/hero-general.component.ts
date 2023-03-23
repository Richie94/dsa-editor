import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from "../../shared/model/hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-general',
  templateUrl: './hero-general.component.html',
  styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent implements OnInit, OnDestroy {

  hero: Hero | undefined;
  private origHero: Hero | undefined;
  saveSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) {
    this.saveSubscription = heroService.shouldSave.subscribe(() => {this.saveHero() })
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


  newAdvantage() {
    if (this.hero) {
      this.hero.advantages.push("")
    }
  }

  newDisadvantage() {
    if (this.hero) {
      this.hero.disadvantages.push("")
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  deleteDisadvantage(i: number) {
    if (this.hero) {
      this.hero.disadvantages.splice(i, 1)
    }
  }

  deleteAdvantage(i: number) {
    if (this.hero) {
      this.hero.advantages.splice(i, 1)
    }
  }
}
