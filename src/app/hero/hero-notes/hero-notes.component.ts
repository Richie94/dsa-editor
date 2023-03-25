import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evening} from '../../shared/model/hero';
import {HeroService} from '../../shared/services/hero.service';
import {AbstractHeroComponent} from "../abstract-hero-component";

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent extends AbstractHeroComponent {

  constructor(
    route: ActivatedRoute,
    heroService: HeroService,
  ) {
    super(route, heroService);
  }

  addNewNote(): void {
    if (this.hero) {
      let newestNote: Evening | undefined = undefined
      if (this.hero.notes.length > 0) {
        newestNote = this.hero.notes[0]
      }

      let note: Evening
      if (newestNote) {
        note = {
          date: new Date().toLocaleDateString(),
          text: "...",
          lep: newestNote.lep,
          asp: newestNote.asp,
          kap: newestNote.kap,
          sch: newestNote.sch
        }
      } else {
        note = {
          date: new Date().toLocaleDateString(),
          text: "...",
          lep: 0,
          asp: 0,
          kap: 0,
          sch: 0
        }
      }
      this.hero.notes.unshift(note)
    }
  }

  deleteNote(i: number) {
    if (this.hero) {
      this.hero.notes.splice(i, 1)
    }
  }
}
