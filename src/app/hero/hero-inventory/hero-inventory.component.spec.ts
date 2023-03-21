import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInventoryComponent } from './hero-inventory.component';

describe('HeroInventoryComponent', () => {
  let component: HeroInventoryComponent;
  let fixture: ComponentFixture<HeroInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
