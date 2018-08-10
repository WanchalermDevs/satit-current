import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandardItemComponent } from './edit-standard-item.component';

describe('EditStandardItemComponent', () => {
  let component: EditStandardItemComponent;
  let fixture: ComponentFixture<EditStandardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStandardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStandardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
