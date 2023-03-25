import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../../shared/services/hero.service";
import {AbstractHeroComponent} from "../abstract-hero-component";

@Component({
  selector: 'app-hero-inventory',
  templateUrl: './hero-inventory.component.html',
  styleUrls: ['./hero-inventory.component.scss']
})
export class HeroInventoryComponent extends AbstractHeroComponent {
  itemAttributeColumns: string[] = ["name", "amount", "weight", "price"]

  constructor(heroService: HeroService, route: ActivatedRoute) {
    super(route, heroService);
  }

  addItem() {
    if (this.hero) {
      this.hero.items.push({
        name: "",
        amount: 0,
        weight: 0,
        price: 0
      })
    }
  }

  deleteItem(i: number) {
    if (this.hero) {
      this.hero.items.splice(i, 1)
    }
  }

}
