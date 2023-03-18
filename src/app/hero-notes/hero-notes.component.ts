import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evening } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent implements OnInit {

  notes: Evening[] | undefined;

  heroId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroId = id
    this.heroService.getNotesFromHero(id)
      .subscribe(notes => this.notes = notes);
  }

  addNewNote(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.addNewNoteForHero(id).subscribe(note => this.notes?.unshift(note))
  }

  saveNotes() : void {
       if (this.notes) {
           console.log(this.notes)
           const id = Number(this.route.snapshot.paramMap.get('id'));
           this.heroService.saveNotesForHero(id, this.notes)
       }
   }

  goBack(): void {
    this.location.back();
  }

}
