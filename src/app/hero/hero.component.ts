import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroService} from "../shared/services/hero.service";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  providers: [HeroDetailComponent]
})
export class HeroComponent implements OnInit {

  compHeroId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.compHeroId = Number(this.router.url.split("/").slice(-1));
    this.router.events.subscribe(() => {
      this.compHeroId = Number(this.router.url.split("/").slice(-1));
    })
  }

  save(): void {
    this.heroService.triggerSave()
  }


}
