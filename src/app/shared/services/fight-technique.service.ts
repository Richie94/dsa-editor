import { Injectable } from '@angular/core';
import {FightTechnique} from "../model/hero";

@Injectable({
  providedIn: 'root'
})
export class FightTechniqueService {

  constructor() { }

  initFightTechniques(): FightTechnique[] {
    return [
      {
        name: "Armbrüste",
        ktw: 6,
        at: 7,
        pa: 0,
      }, {
        name: "Bögen",
        ktw: 6,
        at: 7,
        pa: 0
      }, {
        name: "Wurfwaffeb",
        ktw: 6,
        at: 7,
        pa: 0
      }, {
        name: "Dolche",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Fechtwaffen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Hiebwaffen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Kettenwaffen",
        ktw: 6,
        at: 8,
        pa: 0
      }, {
        name: "Lanzen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Raufen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Schilde",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Schwerter",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Stangenwaffen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Zweihandhiebwaffen",
        ktw: 6,
        at: 8,
        pa: 4
      }, {
        name: "Zweihandschwerter",
        ktw: 6,
        at: 8,
        pa: 4
      }
    ]
  }
}
