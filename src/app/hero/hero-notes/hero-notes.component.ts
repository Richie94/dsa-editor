import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evening} from '../../shared/hero';
import {HeroService} from '../../shared/hero.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent implements OnInit, OnDestroy {

  notes: Evening[] | undefined;

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

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.saveSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.getNotes();
  }

  getNotes(): void {
    if (this.heroId) {
      this.heroService.getNotesFromHero(this.heroId)
        .subscribe(notes => this.notes = notes);
    }
  }

  addNewNote(): void {
    if (this.heroId) {
      this.heroService.addNewNoteForHero(this.heroId).subscribe(note => this.notes?.unshift(note))
    }
  }

  saveNotes(): void {
    console.log("Save notes")
    if (this.notes) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.saveNotesForHero(id, this.notes)
    }
  }

}
