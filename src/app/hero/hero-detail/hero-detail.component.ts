import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../../shared/model/hero';
import {HeroService} from '../../shared/services/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  hero: Hero | undefined;

  private origHero: Hero | undefined;
  saveSubscription: Subscription

  attributeColumns: string[] = ['name', 'probe', 'fw'];

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
          this.origHero = JSON.parse(JSON.stringify(hero))
        }
      );
  }

  saveHero(): void {
    if (this.hero && this.origHero && JSON.stringify(this.hero) !== JSON.stringify(this.origHero)) {
      console.log("Save detail")
      this.heroService.updateHero(this.hero)
    } else {
      console.log("Skip save details")
    }
  }

  resolveProbe(probe: string): string {
    return probe.split("/").map(p => {
      if (p === "MU") {
        return this.hero?.hero_stats?.mu.toString() ?? ""
      } else if (p === "KL") {
        return this.hero?.hero_stats?.kl.toString() ?? ""
      } else if (p === "IN") {
        return this.hero?.hero_stats?.in.toString() ?? ""
      } else if (p === "CH") {
        return this.hero?.hero_stats?.ch.toString() ?? ""
      } else if (p === "FF") {
        return this.hero?.hero_stats?.ff.toString() ?? ""
      } else if (p === "GE") {
        return this.hero?.hero_stats?.ge.toString() ?? ""
      } else if (p === "KO") {
        return this.hero?.hero_stats?.ko.toString() ?? ""
      } else if (p === "KK") {
        return this.hero?.hero_stats?.kk.toString() ?? ""
      } else {
        return ""
      }
    }).join("/")
  }

}
