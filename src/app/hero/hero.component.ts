import {AfterViewInit, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroService} from "../shared/hero.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  providers: [HeroDetailComponent]
})
export class HeroComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  compHeroId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router,
    private observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.compHeroId = Number(this.router.url.split("/").slice(-1));
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

  save(): void {
    this.heroService.triggerSave()
  }


}
