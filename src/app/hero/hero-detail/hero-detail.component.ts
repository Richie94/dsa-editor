import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../../shared/hero';
import {HeroService} from '../../shared/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  hero: Hero | undefined;
  saveSubscription: Subscription

  attributeColumns: string[] = ['talent', 'probe', 'fw'];
  dataSource = [
    {talent: "Fliegen", probe: "MU/IN/GE", fw: 12},
    {talent: "Sinnesschärfe", probe: "MU/IN/GE", fw: 13},
    {talent: "Körperbeherrschung", probe: "MU/IN/GE", fw: 1},
    {talent: "Metallbearbeitung", probe: "MU/IN/GE", fw: 1},
    {talent: "Wildnisleben", probe: "MU/IN/GE", fw: 1},
  ];


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
      .subscribe(hero => this.hero = hero);
  }

  saveHero(): void {
    if (this.hero) {
      console.log("Save detail")
      this.heroService.updateHero(this.hero)
    }
  }

}
