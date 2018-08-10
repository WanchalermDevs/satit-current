import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceEditComponent } from './evidence-edit.component';

describe('EvidenceEditComponent', () => {
  let component: EvidenceEditComponent;
  let fixture: ComponentFixture<EvidenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
