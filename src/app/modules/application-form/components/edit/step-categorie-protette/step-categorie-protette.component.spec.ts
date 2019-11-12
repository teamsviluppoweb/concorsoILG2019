import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepCategorieProtetteComponent} from './step-categorie-protette.component';

describe('StepCategorieProtetteComponent', () => {
  let component: StepCategorieProtetteComponent;
  let fixture: ComponentFixture<StepCategorieProtetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepCategorieProtetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCategorieProtetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
