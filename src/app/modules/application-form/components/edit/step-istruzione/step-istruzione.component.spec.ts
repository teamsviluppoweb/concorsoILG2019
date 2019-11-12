import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepIstruzioneComponent} from './step-istruzione.component';

describe('StepIstruzioneComponent', () => {
  let component: StepIstruzioneComponent;
  let fixture: ComponentFixture<StepIstruzioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepIstruzioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepIstruzioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
