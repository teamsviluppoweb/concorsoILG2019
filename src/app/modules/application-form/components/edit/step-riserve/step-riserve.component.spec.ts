import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepRiserveComponent} from './step-riserve.component';

describe('StepRiserveComponent', () => {
  let component: StepRiserveComponent;
  let fixture: ComponentFixture<StepRiserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepRiserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepRiserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
