import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FlexDirective, LayoutAlignDirective, LayoutDirective, LayoutGapDirective} from "@ngbracket/ngx-layout";
import {MatList, MatListItem} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {LowerCasePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
    selector: 'app-hero-general',
    templateUrl: './hero-general.component.html',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatInput,
        FormsModule,
        LayoutDirective,
        MatLabel,
        MatList,
        MatListItem,
        FlexDirective,
        LayoutGapDirective,
        LayoutAlignDirective,
        MatButton,
        LowerCasePipe,
        MatIcon,
        CdkTextareaAutosize
    ],
    styleUrls: ['./hero-general.component.css']
})
export class HeroGeneralComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    authService: AuthService,
    heroService: HeroService,
  ) {
    super(route, authService, heroService);
  }

  newAdvantage() {
    if (this.hero && !this.readOnly()) {
      this.hero.advantages.push("")
    }
  }

  newDisadvantage() {
    if (this.hero && !this.readOnly()) {
      this.hero.disadvantages.push("")
    }
  }

  deleteDisadvantage(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.disadvantages.splice(i, 1)
    }
  }

  deleteAdvantage(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.advantages.splice(i, 1)
    }
  }
}
