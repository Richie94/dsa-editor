import {Component, Inject, OnInit} from '@angular/core';
import {Hero} from '../../shared/hero';
import {HeroService} from '../../shared/hero.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, public dialog: MatDialog) {
  }

  heroes: Hero[] = []

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewHeroDialog, {
      data: {name: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createHero(result);
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  createHero(name: string): void {
    this.heroService.createHero(name).subscribe((h) => this.heroes.push(h))
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'add-new-hero-dialog',
  templateUrl: 'add-new-hero-dialog.html',
})
export class AddNewHeroDialog {
  constructor(
    public dialogRef: MatDialogRef<AddNewHeroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
