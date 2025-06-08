import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleInventoryComponent } from './sale-inventory.component';

describe('SaleInventoryComponent', () => {
  let component: SaleInventoryComponent;
  let fixture: ComponentFixture<SaleInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
