import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-general',
  templateUrl: './hero-general.component.html',
  styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent implements OnInit{


  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  saveHero(): void {
    if (this.hero) {
      console.log("Save hero")
      this.heroService.updateHero(this.hero)
    }
  }


}
