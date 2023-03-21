import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMagicComponent } from './hero-magic.component';

describe('HeroMagicComponent', () => {
  let component: HeroMagicComponent;
  let fixture: ComponentFixture<HeroMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMagicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
