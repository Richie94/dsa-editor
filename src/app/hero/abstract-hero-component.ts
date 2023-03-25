import {Component, OnDestroy, OnInit} from "@angular/core";
import {Hero} from "../shared/model/hero";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../shared/services/hero.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  template: ''
})
export abstract class AbstractHeroComponent implements OnInit, OnDestroy {

  heroId: string | undefined;
  hero: Hero | undefined;
  private origHero: Hero | undefined;
  saveSubscription: Subscription

  protected constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
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
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.heroService.getHero(id)
      .subscribe(heroWrapper => {
        if (heroWrapper) {
          this.hero = heroWrapper.hero
          this.heroId = heroWrapper.id
          // clone the nested objects
          this.origHero = JSON.parse(JSON.stringify(heroWrapper.hero))
        }
      });
  }

  saveHero(): void {
    if (this.heroId && this.hero && JSON.stringify(this.hero) !== JSON.stringify(this.origHero)) {
      console.log("Save general")
      this.heroService.updateHero({id: this.heroId, hero: this.hero})
    } else {
      console.log("Skip save general")
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  readOnly(): boolean {
    return this.hero?.creator_id !== this.authService.userData?.uid
  }
}
