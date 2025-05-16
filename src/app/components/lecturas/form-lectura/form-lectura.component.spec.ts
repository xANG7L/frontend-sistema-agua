import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLecturaComponent } from './form-lectura.component';

describe('FormLecturaComponent', () => {
  let component: FormLecturaComponent;
  let fixture: ComponentFixture<FormLecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLecturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
