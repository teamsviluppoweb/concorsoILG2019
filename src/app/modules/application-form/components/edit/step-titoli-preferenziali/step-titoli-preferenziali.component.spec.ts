import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {StepTitoliPreferenzialiComponent} from './step-titoli-preferenziali.component';

describe('StepTitoliPreferenzialiComponent', () => {
  let component: StepTitoliPreferenzialiComponent;
  let fixture: ComponentFixture<StepTitoliPreferenzialiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTitoliPreferenzialiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTitoliPreferenzialiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
