import {Component, Inject, OnInit} from '@angular/core';
import {Hero, HeroWrapper} from '../../shared/model/hero';
import {HeroService} from '../../shared/services/hero.service';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList} from "@angular/material/list";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    imports: [
        RouterLink,
        MatCardContent,
        MatCardTitle,
        MatCardHeader,
        MatCard,
        MatList,
        MatButton
    ],
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, public dialog: MatDialog) {
  }

  heroes: HeroWrapper[] = []

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
    this.heroService.createHero(name).subscribe((h) =>
      this.heroes.push(h)
    )
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
    imports: [
        MatDialogContent,
        MatFormField,
        MatInput,
        FormsModule,
        MatDialogClose,
        MatButton,
        MatDialogActions,
        MatLabel
    ],
    templateUrl: 'add-new-hero-dialog.html'
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
