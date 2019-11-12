import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDichiarazioneComponent } from './step-dichiarazione.component';

describe('StepDichiarazioneComponent', () => {
  let component: StepDichiarazioneComponent;
  let fixture: ComponentFixture<StepDichiarazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDichiarazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDichiarazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
