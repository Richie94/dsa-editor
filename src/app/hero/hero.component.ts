import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HeroService} from "../shared/services/hero.service";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        MatToolbar,
        MatToolbarRow,
        MatButton,
        RouterLink,
        RouterLinkActive,
        RouterOutlet
    ],
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
        if (split.length > 2) {
            return split[3]
        }
        return undefined
    }

}
