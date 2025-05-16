import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaArchivosComponent } from './subida-archivos.component';

describe('SubidaArchivosComponent', () => {
  let component: SubidaArchivosComponent;
  let fixture: ComponentFixture<SubidaArchivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubidaArchivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubidaArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
