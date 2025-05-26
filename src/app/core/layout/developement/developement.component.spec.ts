import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopementComponent } from './developement.component';

describe('DevelopementComponent', () => {
  let component: DevelopementComponent;
  let fixture: ComponentFixture<DevelopementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
