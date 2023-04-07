import {Injectable} from '@angular/core';
import {FightTechnique, Hero} from "../model/hero";

@Injectable({
    providedIn: 'root'
})
export class FightTechniqueService {

    constructor() {
    }

    initFightTechniques(): FightTechnique[] {
        return [
            {
                name: "Armbrüste",
                ktw: 6,
            }, {
                name: "Bögen",
                ktw: 6,
            }, {
                name: "Wurfwaffen",
                ktw: 6,
            }, {
                name: "Dolche",
                ktw: 6,
            }, {
                name: "Fechtwaffen",
                ktw: 6,
            }, {
                name: "Hiebwaffen",
                ktw: 6,
            }, {
                name: "Kettenwaffen",
                ktw: 6,
            }, {
                name: "Lanzen",
                ktw: 6,
            }, {
                name: "Raufen",
                ktw: 6,
            }, {
                name: "Schilde",
                ktw: 6,
            }, {
                name: "Schwerter",
                ktw: 6,
            }, {
                name: "Stangenwaffen",
                ktw: 6,
            }, {
                name: "Zweihandhiebwaffen",
                ktw: 6,
            }, {
                name: "Zweihandschwerter",
                ktw: 6,
            }
        ]
    }

    private leiteigenschaften = new Map<string, ((data: Hero) => number)>([
        ["Armbrüste", (hero: Hero) => hero.hero_stats.ff],
        ["Bögen", (hero: Hero) => hero.hero_stats.ff],
        ["Dolche", (hero: Hero) => hero.hero_stats.ge],
        ["Fechtwaffen", (hero: Hero) => hero.hero_stats.ge],
        ["Hiebwaffen", (hero: Hero) => hero.hero_stats.kk],
        ["Kettenwaffen", (hero: Hero) => hero.hero_stats.kk],
        ["Lanzen", (hero: Hero) => hero.hero_stats.kk],
        ["Raufen", (hero: Hero) => Math.max(hero.hero_stats.ge, hero.hero_stats.kk)],
        ["Schilde", (hero: Hero) => hero.hero_stats.kk],
        ["Schwerter", (hero: Hero) => Math.max(hero.hero_stats.ge, hero.hero_stats.kk)],
        ["Stangenwaffen", (hero: Hero) => Math.max(hero.hero_stats.ge, hero.hero_stats.kk)],
        ["Wurfwaffen", (hero: Hero) => hero.hero_stats.ff],
        ["Zweihandhiebwaffen", (hero: Hero) => hero.hero_stats.kk],
        ["Zweihandschwerter", (hero: Hero) => hero.hero_stats.kk]
    ])

    getAt(technique: FightTechnique, hero: Hero): number {
        if (this.isRangedWeapon(technique)) {
            return technique.ktw + Math.floor((hero.hero_stats.ff - 8) / 3);
        }
        return technique.ktw + Math.floor((hero.hero_stats.mu - 8) / 3);
    }

    getPa(technique: FightTechnique, hero: Hero): number {
        if (this.isRangedWeapon(technique)) {
            return 0;
        }
        let base = Math.ceil(technique.ktw / 2);
        return base + Math.floor((this.leiteigenschaften.get(technique.name)!(hero) - 8) / 3);
    }

    private isRangedWeapon(technique: FightTechnique): boolean {
        return ["Armbrüste", "Bögen", "Wurfwaffen"].includes(technique.name);
    }
}
