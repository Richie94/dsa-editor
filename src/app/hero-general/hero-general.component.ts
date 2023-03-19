import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-hero-general',
  templateUrl: './hero-general.component.html',
  styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private observer: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 767px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
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
