import { Injectable } from '@angular/core';
import { Evening, Hero } from './hero';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(this.HEROES);
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = this.HEROES.find(h => h.id === id)!;
    return of(hero);
  }

  createHero(name: string) {
    this.HEROES.push({id: this.HEROES.length + 1, name: name, creator_id:1, hero_stats: {mu: 8, kl:8, in:8, ch:8, ge: 8, ff: 8, kk:8, ko:8}})
  }

  updateHero(hero: Hero) {
   const index = this.HEROES.indexOf(hero, 0)
   if (index > -1) {
      this.HEROES[index] = hero
      console.log(this.HEROES)
   }
  }

  getNotesFromHero(hero_id: number): Observable<Evening[]> {
    const hero = this.NOTES.filter(h => h.hero_id === hero_id)!;
    return of(hero);
  }

  addNewNoteForHero(hero_id: number) : Observable<Evening> {
      const note : Evening = {
        id: this.NOTES.length + 1,
        hero_id: hero_id,
        date: new Date(),
        text: "..."
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

  NOTES : Evening[] = [
      {
          id: 1,
          hero_id: 1,
          text: "Wir lagen vor Madagaskar.",
          date: new Date("2023-03-01")
      },
      {
          id: 2,
          hero_id: 1,
          text: "Und gestorben.",
          date: new Date("2023-02-16")
      }
  ]

  HEROES : Hero[] = [
      {
          id: 1,
          name: "Hammer Harald",
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
          id: 3,
          name: "Grimelda",
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
