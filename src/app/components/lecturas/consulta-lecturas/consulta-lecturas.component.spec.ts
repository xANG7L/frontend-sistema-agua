import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLecturasComponent } from './consulta-lecturas.component';

describe('ConsultaLecturasComponent', () => {
  let component: ConsultaLecturasComponent;
  let fixture: ComponentFixture<ConsultaLecturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaLecturasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaLecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
