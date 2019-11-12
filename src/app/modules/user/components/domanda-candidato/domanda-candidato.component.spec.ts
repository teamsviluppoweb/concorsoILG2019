import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomandaCandidatoComponent } from './domanda-candidato.component';

describe('DomandaCandidatoComponent', () => {
  let component: DomandaCandidatoComponent;
  let fixture: ComponentFixture<DomandaCandidatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomandaCandidatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomandaCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
