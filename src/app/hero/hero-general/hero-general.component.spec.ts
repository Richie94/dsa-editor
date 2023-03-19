import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGeneralComponent } from './hero-general.component';

describe('HeroGeneralComponent', () => {
  let component: HeroGeneralComponent;
  let fixture: ComponentFixture<HeroGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
