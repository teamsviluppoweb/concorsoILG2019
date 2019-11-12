import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepLinguaComponent} from './step-lingua.component';

describe('StepLinguaComponent', () => {
  let component: StepLinguaComponent;
  let fixture: ComponentFixture<StepLinguaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepLinguaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLinguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
