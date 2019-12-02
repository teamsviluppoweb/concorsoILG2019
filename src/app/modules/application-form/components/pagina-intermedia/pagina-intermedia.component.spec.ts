import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaIntermediaComponent } from './pagina-intermedia.component';

describe('PaginaIntermediaComponent', () => {
  let component: PaginaIntermediaComponent;
  let fixture: ComponentFixture<PaginaIntermediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaIntermediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaIntermediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
