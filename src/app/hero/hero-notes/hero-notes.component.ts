import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evening, Hero} from '../../shared/model/hero';
import {HeroService} from '../../shared/services/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent implements OnInit, OnDestroy {

  hero: Hero | undefined;
  private origHero: Hero | undefined;

  heroId: number | undefined;
  saveSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) {
    this.saveSubscription = heroService.shouldSave.subscribe(() => {
      this.saveNotes()
    })
  }

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.getHero();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.saveSubscription.unsubscribe();
    this.saveNotes()
  }

  getHero(): void {
    if (this.heroId) {
      this.heroService.getHero(this.heroId)
        .subscribe(hero => {
          this.hero = hero
          this.origHero = JSON.parse(JSON.stringify(hero))
        });
    }
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

  saveNotes(): void {
    if (this.hero && JSON.stringify(this.hero) !== JSON.stringify(this.origHero)) {
      console.log("Save notes")
      this.heroService.updateHero(this.hero)
    } else {
      console.log("Skip save notes")
    }
  }

}
