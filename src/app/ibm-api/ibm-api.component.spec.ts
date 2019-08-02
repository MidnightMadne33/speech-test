import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmApiComponent } from './ibm-api.component';

describe('IbmApiComponent', () => {
  let component: IbmApiComponent;
  let fixture: ComponentFixture<IbmApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbmApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbmApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
