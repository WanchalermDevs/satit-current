import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingRoleManagementComponent } from './setting-role-management.component';

describe('SettingRoleManagementComponent', () => {
  let component: SettingRoleManagementComponent;
  let fixture: ComponentFixture<SettingRoleManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingRoleManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
