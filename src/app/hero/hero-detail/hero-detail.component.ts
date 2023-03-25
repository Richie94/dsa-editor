import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../shared/services/hero.service';
import {AbstractHeroComponent} from "../abstract-hero-component";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    heroService: HeroService,
  ) {
    super(route, heroService);
  }

  attributeColumns: string[] = ['name', 'probe', 'fw'];

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
