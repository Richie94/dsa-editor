import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFightComponent } from './hero-fight.component';

describe('HeroFightComponent', () => {
  let component: HeroFightComponent;
  let fixture: ComponentFixture<HeroFightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroFightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
