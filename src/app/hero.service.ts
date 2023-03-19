import {Injectable} from '@angular/core';
import {Evening, Hero} from './hero';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() {
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
      let heroes : Hero[] = JSON.parse(localHero)
      return of(heroes.find(h => h.id === id)!);
    }
    const hero = this.HEROES.find(h => h.id === id)!;
    return of(hero);
  }

  createHero(name: string) {
    this.HEROES.push({
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
    })
    localStorage.setItem("hero", JSON.stringify(this.HEROES))
  }

  updateHero(hero: Hero) {
    const index = this.HEROES.indexOf(hero, 0)
    if (index > -1) {
      this.HEROES[index] = hero
      localStorage.setItem("hero", JSON.stringify(this.HEROES))
      console.log(this.HEROES)
    }
  }

  getNotesFromHero(hero_id: number): Observable<Evening[]> {
    const notes = this.NOTES.filter(h => h.hero_id === hero_id)!;
    return of(notes);
  }

  addNewNoteForHero(hero_id: number): Observable<Evening> {
    const notes = this.NOTES.filter(h => h.hero_id === hero_id)!;
    // TODO: get newest not to copy lep/asp/...
    const note: Evening = {
      id: this.NOTES.length + 1,
      hero_id: hero_id,
      date: new Date(),
      text: "...",
      lep: 35,
      asp: 0,
      kap: 0,
      sch: 3
    }
    this.NOTES.unshift(note)
    return of(note)
  }

  saveNotesForHero(hero_id: number, notes: Evening[]) {
    this.NOTES = this.NOTES.filter(h => h.hero_id != hero_id)!;
    this.NOTES.push(...notes)
  }

  deleteNoteById(id: number) {

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
