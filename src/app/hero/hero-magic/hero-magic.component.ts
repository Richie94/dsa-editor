import {Component} from '@angular/core';
import {AbstractHeroComponent} from "../abstract-hero-component";
import {HeroService} from "../../shared/services/hero.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-hero-magic',
    templateUrl: './hero-magic.component.html',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatInput,
        MatTooltip,
        FormsModule,
        MatButton,
        MatLabel,
        MatIcon
    ],
    styleUrls: ['./hero-magic.component.scss']
})
export class HeroMagicComponent extends AbstractHeroComponent {

  constructor(
    heroService: HeroService,
    route: ActivatedRoute,
    authService: AuthService,) {
    super(route, authService, heroService);
  }

  addSpell() {
    if (this.hero && !this.readOnly()) {
      this.hero.magic_spells.push({
        name: "",
        probe: "",
        spell_duration: "",
        cast_duration: "",
        range: "",
        target: "",
        sf: "",
        cost: ""
      })
    }
  }

  deleteSpell(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.magic_spells.splice(i, 1)
    }
  }

}
