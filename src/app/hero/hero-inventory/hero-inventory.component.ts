import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";
import {AuthService} from "../../shared/services/auth.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'app-hero-inventory',
    templateUrl: './hero-inventory.component.html',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatButton
    ],
    styleUrls: ['./hero-inventory.component.scss']
})
export class HeroInventoryComponent extends AbstractHeroComponent {
  constructor(
    heroService: HeroService,
    authService: AuthService,
    route: ActivatedRoute) {
    super(route, authService, heroService);
  }

  addItem() {
    if (this.hero && !this.readOnly()) {
      this.hero.items.push({
        name: "",
        amount: 0,
        weight: 0,
        price: 0
      })
    }
  }

  deleteItem(i: number) {
    if (this.hero && !this.readOnly()) {
      this.hero.items.splice(i, 1)
    }
  }

}
