import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepInviaDomandaComponent} from './step-invia-domanda.component';

describe('StepInviaDomandaComponent', () => {
  let component: StepInviaDomandaComponent;
  let fixture: ComponentFixture<StepInviaDomandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepInviaDomandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepInviaDomandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
