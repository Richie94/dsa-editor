import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evening} from '../../shared/model/hero';
import {HeroService} from '../../shared/services/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent implements OnInit, OnDestroy {

  notes: Evening[] | undefined;
  private origNotes: Evening[] | undefined;

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
    this.getNotes();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.saveSubscription.unsubscribe();
    this.saveNotes()
  }

  getNotes(): void {
    if (this.heroId) {
      this.heroService.getNotesFromHero(this.heroId)
        .subscribe(notes => {
          this.notes = notes
          this.origNotes = JSON.parse(JSON.stringify(notes))
        });
    }
  }

  addNewNote(): void {
    if (this.heroId) {
      this.heroService.addNewNoteForHero(this.heroId).subscribe(note => this.notes?.unshift(note))
    }
  }

  saveNotes(): void {
    if (this.notes && JSON.stringify(this.notes) !== JSON.stringify(this.origNotes)) {
      console.log("Save notes")
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.saveNotesForHero(id, this.notes)
    } else {
      console.log("Skip save notes")
    }
  }

}
