import {FormService} from './form.service';
import {TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';


describe('FormService', () => {


  let formService: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FormService,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]

    });

    formService = TestBed.get((FormService));
  });

  afterEach(() => {
  });


  it('Formservice should be created', () => {
    const service: FormService = TestBed.get(FormService);
    expect(service).toBeTruthy();
  });


  it('serializeIstruzioneFg should serialize correctly data', () => {
    formService.tipologia.patchValue('ciao');
    expect(formService.tipologia.value).toEqual('ciao');
  });


});
