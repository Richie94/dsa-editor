import {Injectable} from '@angular/core';
import {Evening, FightTechnique, Hero, Talent} from '../model/hero';
import {Observable, of, Subject} from 'rxjs';
import {AuthService} from "./auth.service";
import {TalentService} from "./talent.service";
import {FightTechniqueService} from "./fight-technique.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  hero: Hero | undefined;

  private saveSubscription = new Subject<string>();
  shouldSave = this.saveSubscription.asObservable()

  constructor(private authService: AuthService, private talentService: TalentService, private fightTechniqueService: FightTechniqueService) {

  }

  triggerSave() {
    this.saveSubscription.next("");
  }

  getHeroes(): Observable<Hero[]> {
    const localHero = localStorage.getItem("hero")
    if (localHero) {
      return of(JSON.parse(localHero));
    }
    return of(this.HEROES);
  }

  getHero(id: number): Observable<Hero> {
    const localHero = localStorage.getItem("hero")
    if (localHero) {
      let heroes: Hero[] = JSON.parse(localHero)
      let matchingHero = heroes.find(h => h.id === id)!;
      this.hero = matchingHero;
      return of(matchingHero);
    }
    const hero = this.HEROES.find(h => h.id === id)!;
    this.hero = hero;
    return of(hero);
  }

  createHero(name: string): Observable<Hero> {
    console.log("Create hero " + name)
    let hero = {
      id: this.HEROES.length + 1,
      ap: 1000,
      name: name,
      description: "",
      species: "",
      culture: "",
      profession: "",
      eyeColor: "",
      hairColor: "",
      sex: "",
      le: 20,
      gs: 8,
      ini: 10,
      sk: 1,
      zk: 1,
      aw: 8,
      age: null,
      size: null,
      weight: null,
      languages: [],
      writings: [],
      advantages: [],
      disadvantages: [],
      creator_id: this.authService.userData!.uid,
      hero_stats: {mu: 8, kl: 8, in: 8, ch: 8, ge: 8, ff: 8, kk: 8, ko: 8},
      notes: [],
      weapons: [],
      armor: [],
      shield: [],
      special_abilities: [],
      special_fight_abilities: [],
      fight_techniques: this.fightTechniqueService.initFightTechniques(),
      talents: this.talentService.initTalents(),
      items: [],
      liturgic_spells: [],
      magic_spells: [],
      wallet: {
        dukaten: 0,
        silbertaler: 0,
        heller: 0,
        kreuzer: 0
      },

    };
    this.HEROES.push(hero)
    localStorage.setItem("hero", JSON.stringify(this.HEROES))
    return of(hero)
  }


  updateHero(hero: Hero) {
    const index = this.HEROES.findIndex(h => h.id == hero.id)
    if (index > -1) {
      this.HEROES[index] = hero
      localStorage.setItem("hero", JSON.stringify(this.HEROES))
    }
  }

  HEROES: Hero[] = [
    {
      id: 1,
      ap: 1520,
      name: "Hammer Harald",
      species: "Mensch",
      culture: "Nordland",
      profession: "Krieger",
      eyeColor: "blau",
      hairColor: "braun",
      sex: "männlich",
      languages: ["Nordisch"],
      writings: ["Nordisch"],
      advantages: ["Gewandtheit", "Schlitzohr", "Schönheit"],
      disadvantages: ["Fett", "Dumm"],
      age: 30,
      size: 180,
      weight: 80,
      le: 20,
      gs: 8,
      ini: 10,
      sk: 1,
      zk: 1,
      aw: 8,
      description: "Treuer Held",
      creator_id: "1",
      hero_stats: {
        mu: 14,
        kl: 10,
        in: 13,
        ch: 10,
        ff: 13,
        ge: 13,
        ko: 15,
        kk: 17
      },
      weapons: [
        {
          name: "Hammer",
          technique: "Hiebwaffen",
          tp: "1W6+1",
          reach: "kurz",
          at: 16,
          pa: 10,
          barrier: "KK 10"
        }],
      armor: [
        {
          name: "Lederpanzer",
          rs: 2,
          be: 1,
          mod: ""
        }
      ],
      shield: [
        {
          name: "Schild",
          sp: 22,
          at: 12,
          pa: 12
        }
      ],
      special_abilities: ["Athlet"],
      special_fight_abilities: ["Tritt in die Eier"],
      fight_techniques: this.fightTechniqueService.initFightTechniques(),
      talents: this.talentService.initTalents(),
      items: [
        {
          name: "Brot",
          amount: 2,
          weight: 1.24,
          price: 1
        }
      ],
      wallet: {
        dukaten: 10,
        silbertaler: 10,
        heller: 10,
        kreuzer: 10
      },
      notes: [
        {
          id: 1,
          text: "Wir lagen vor Madagaskar.",
          date: "10.1.2023",
          lep: 35,
          asp: 0,
          kap: 0,
          sch: 3
        },
        {
          id: 0,
          text: "Und gestorben.",
          date: "22.12.2022",
          lep: 27,
          asp: 0,
          kap: 0,
          sch: 3
        }
      ],
      liturgic_spells: [
        {
          name: "Ablativum",
          probe: "MU/KL/CH",
          target: "selbst",
          sf: "D",
          spell_duration: "1",
          cost: "1",
          cast_duration: "2",
          range: "selbst",
        },
        {
          name: "Ablativum",
          probe: "MU/KL/CH",
          target: "selbst",
          sf: "D",
          spell_duration: "1",
          cost: "1",
          cast_duration: "2",
          range: "selbst",
        }
      ],
      magic_spells: [
        {
          name: "Ablativum",
          probe: "MU/KL/CH",
          target: "selbst",
          sf: "D",
          spell_duration: "1",
          cost: "1",
          cast_duration: "2",
          range: "selbst",
        },
        {
          name: "Ablativum",
          probe: "MU/KL/CH",
          target: "selbst",
          sf: "D",
          spell_duration: "1",
          cost: "1",
          cast_duration: "2",
          range: "selbst",
        }
      ]
    },
    {
      id: 2,
      le: 20,
      gs: 8,
      ini: 10,
      sk: 1,
      zk: 1,
      aw: 8,
      name: "Berta",
      ap: 1200,
      description: "dicke Tante",
      creator_id: "1",
      species: "Mensch",
      culture: "Nordland",
      profession: "Krieger",
      eyeColor: "blau",
      hairColor: "braun",
      sex: "männlich",
      languages: ["Nordisch"],
      writings: ["Nordisch"],
      advantages: ["Gewandtheit"],
      disadvantages: ["Fett"],
      age: 30,
      weight: 80,
      size: 180,
      hero_stats: {
        mu: 14,
        kl: 10,
        in: 13,
        ch: 10,
        ff: 13,
        ge: 13,
        ko: 15,
        kk: 17
      },
      notes: [],
      liturgic_spells: [],
      magic_spells: [],
      weapons: [
        {
          name: "Hammer",
          technique: "Hiebwaffen",
          tp: "1W6+1",
          reach: "kurz",
          at: 16,
          pa: 10,
          barrier: "KK 10"
        }],
      armor: [],
      shield: [],
      special_abilities: [],
      special_fight_abilities: [],
      fight_techniques: this.fightTechniqueService.initFightTechniques(),
      talents: this.talentService.initTalents(),
      items: [],
      wallet: {
        dukaten: 10,
        silbertaler: 10,
        heller: 10,
        kreuzer: 10
      },
    },
    {
      id: 3,
      le: 20,
      gs: 8,
      ini: 10,
      sk: 1,
      zk: 1,
      aw: 8,
      ap: 1100,
      name: "Grimelda",
      description: "Alte Frau",
      species: "Mensch",
      culture: "Nordland",
      profession: "Krieger",
      eyeColor: "blau",
      hairColor: "braun",
      sex: "männlich",
      languages: ["Nordisch"],
      writings: ["Nordisch"],
      advantages: ["Gewandtheit"],
      disadvantages: ["Fett"],
      age: 30,
      size: 180,
      weight: 80,
      creator_id: "1",
      hero_stats: {
        mu: 14,
        kl: 10,
        in: 13,
        ch: 10,
        ff: 13,
        ge: 13,
        ko: 15,
        kk: 17
      },
      liturgic_spells: [],
      magic_spells: [],
      notes: [],
      weapons: [
        {
          name: "Hammer",
          technique: "Hiebwaffen",
          tp: "1W6+1",
          reach: "kurz",
          at: 16,
          pa: 10,
          barrier: "KK 10"
        }],
      armor: [],
      shield: [],
      special_abilities: [],
      special_fight_abilities: [],
      fight_techniques: this.fightTechniqueService.initFightTechniques(),
      talents: this.talentService.initTalents(),
      items: [],
      wallet: {
        dukaten: 10,
        silbertaler: 10,
        heller: 10,
        kreuzer: 10
      },
    }
  ]
}
