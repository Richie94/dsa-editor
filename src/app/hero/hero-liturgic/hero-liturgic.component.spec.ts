import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroLiturgicComponent } from './hero-liturgic.component';

describe('HeroLiturgicComponent', () => {
  let component: HeroLiturgicComponent;
  let fixture: ComponentFixture<HeroLiturgicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroLiturgicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroLiturgicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
