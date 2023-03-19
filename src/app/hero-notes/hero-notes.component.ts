import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evening } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-hero-notes',
  templateUrl: './hero-notes.component.html',
  styleUrls: ['./hero-notes.component.css']
})
export class HeroNotesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  notes: Evening[] | undefined;

  heroId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 767px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
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

}
