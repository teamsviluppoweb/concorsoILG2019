import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsitiComponent } from './esiti.component';

describe('EsitiComponent', () => {
  let component: EsitiComponent;
  let fixture: ComponentFixture<EsitiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsitiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
