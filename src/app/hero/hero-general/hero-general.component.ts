import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hero} from "../../shared/hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/hero.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-general',
  templateUrl: './hero-general.component.html',
  styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent implements OnInit, OnDestroy {


  hero: Hero | undefined;
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
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  saveHero(): void {
    if (this.hero) {
      console.log("Save general")
      this.heroService.updateHero(this.hero)
    }
  }


  newAdvantage() {
    if (this.hero) {
      this.hero.advantages.push("")
      this.saveHero()
    }
  }

  newDisadvantage() {
    if (this.hero) {
      this.hero.disadvantages.push("")
      this.saveHero()
    }
  }
}
