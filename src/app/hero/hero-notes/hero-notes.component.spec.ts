import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroNotesComponent } from './hero-notes.component';

describe('HeroNotesComponent', () => {
  let component: HeroNotesComponent;
  let fixture: ComponentFixture<HeroNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
