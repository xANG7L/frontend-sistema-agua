import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroClientesComponent } from './filtro-clientes.component';

describe('FiltroClientesComponent', () => {
  let component: FiltroClientesComponent;
  let fixture: ComponentFixture<FiltroClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
