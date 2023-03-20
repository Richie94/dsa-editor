import {Injectable} from '@angular/core';
import {Evening, Hero} from '../model/hero';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  hero : Hero | undefined;

  private saveSubscription = new Subject<string>();
  shouldSave = this.saveSubscription.asObservable()

  constructor() {
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

  createHero(name: string) : Observable<Hero> {
    console.log("Create hero " + name)
    let hero = {
      id: this.HEROES.length + 1,
      name: name,
      description: "",
      species: "",
      culture: "",
      profession: "",
      eyeColor: "",
      hairColor: "",
      sex: "",
      age: null,
      size: null,
      weight: null,
      languages: [],
      writings: [],
      advantages: [],
      disadvantages: [],
      creator_id: 1,
      hero_stats: {mu: 8, kl: 8, in: 8, ch: 8, ge: 8, ff: 8, kk: 8, ko: 8}
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

  getNotesFromHero(hero_id: number): Observable<Evening[]> {
    const notes = this.NOTES.filter(h => h.hero_id === hero_id)!;
    return of(notes);
  }

  maxByDate(e1: Evening, e2: Evening): Evening {
    if (e1.date > e2.date) {
      return e1
    } else {
      return e2
    }
  }

  addNewNoteForHero(hero_id: number): Observable<Evening> {
    const notes = this.NOTES.filter(h => h.hero_id === hero_id)!;
    // get the newest note by date
    let newestNote : Evening | undefined = undefined
    if (notes.length > 0) {
      newestNote = notes.reduce(this.maxByDate)
    }

    let note: Evening
    if (newestNote) {
      note = {
        id: this.NOTES.length + 1,
        hero_id: hero_id,
        date: new Date(),
        text: "...",
        lep: newestNote.lep,
        asp: newestNote.asp,
        kap: newestNote.kap,
        sch: newestNote.sch
      }
    } else {
      note = {
        id: this.NOTES.length + 1,
        hero_id: hero_id,
        date: new Date(),
        text: "...",
        lep: 0,
        asp: 0,
        kap: 0,
        sch: 0
      }
    }
    this.NOTES.unshift(note)
    return of(note)
  }

  saveNotesForHero(hero_id: number, notes: Evening[]) {
    this.NOTES = this.NOTES.filter(h => h.hero_id != hero_id)!;
    this.NOTES.push(...notes)
  }

  NOTES: Evening[] = [
    {
      id: 1,
      hero_id: 1,
      text: "Wir lagen vor Madagaskar.",
      date: new Date("2023-03-01"),
      lep: 35,
      asp: 0,
      kap: 0,
      sch: 3
    },
    {
      id: 2,
      hero_id: 1,
      text: "Und gestorben.",
      date: new Date("2023-02-16"),
      lep: 27,
      asp: 0,
      kap: 0,
      sch: 3
    }
  ]

  HEROES: Hero[] = [
    {
      id: 1,
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
      description: "Treuer Held",
      creator_id: 1,
      hero_stats: {
        mu: 14,
        kl: 10,
        in: 13,
        ch: 10,
        ff: 13,
        ge: 13,
        ko: 15,
        kk: 17
      }
    },
    {
      id: 2,
      name: "Berta",
      description: "dicke Tante",
      creator_id: 1,
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
      }
    },
    {
      id: 3,
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
      creator_id: 1,
      hero_stats: {
        mu: 14,
        kl: 10,
        in: 13,
        ch: 10,
        ff: 13,
        ge: 13,
        ko: 15,
        kk: 17
      }
    }
  ]
}