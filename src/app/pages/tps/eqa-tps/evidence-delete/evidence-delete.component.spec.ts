import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceDeleteComponent } from './evidence-delete.component';

describe('EvidenceDeleteComponent', () => {
  let component: EvidenceDeleteComponent;
  let fixture: ComponentFixture<EvidenceDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
