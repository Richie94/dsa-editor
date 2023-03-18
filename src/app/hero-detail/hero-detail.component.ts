import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  attributeColumns: string[] = ['talent', 'probe', 'fw'];
  dataSource = [
  {talent: "Fliegen", probe: "MU/IN/GE", fw: 12},
  {talent: "Sinnesschärfe", probe: "MU/IN/GE", fw: 13},
  {talent: "Körperbeherrschung", probe: "MU/IN/GE", fw: 1},
  ];



  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  saveHero() : void {
  if (this.hero) {
  console.log("Save hero")
        this.heroService.updateHero(this.hero)
    }
  }

}
