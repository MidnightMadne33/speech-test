import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureApiComponent } from './azure-api.component';

describe('AzureApiComponent', () => {
  let component: AzureApiComponent;
  let fixture: ComponentFixture<AzureApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzureApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzureApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
