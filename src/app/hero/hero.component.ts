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

  compHeroId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.compHeroId = this.getIdFromUrl();
    this.router.events.subscribe(() => {
      this.compHeroId = this.getIdFromUrl();
    })
  }

  save(): void {
    this.heroService.triggerSave()
  }


  private getIdFromUrl(): string | undefined {
    const split = this.router.url.split("/")
    console.log(split)
    if (split.length > 2) {
      return split[3]
    }
    return undefined
  }

}
