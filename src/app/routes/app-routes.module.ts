import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Http, Response, Headers, HttpModule } from '@angular/http';
import { LogedinGuard } from '../guard/logedin.guard';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { EqaHomeComponent } from '../pages/mis/eqa/eqa-home/eqa-home.component';
import { DashboardComponent } from '../pages/mis/authorities/dashboard/dashboard.component';
import { StandardManagementComponent } from '../pages/mis/eqa/standard-management/standard-management.component';
import { AddStandardListComponent } from '../pages/mis/eqa/add-standard-list/add-standard-list.component';
import { EditStandardItemComponent } from '../pages/mis/eqa/edit-standard-item/edit-standard-item.component';
import { SettingRoleManagementComponent } from '../pages/mis/eqa/setting-role-management/setting-role-management.component';
import { StandardListManagementComponent } from '../pages/mis/eqa/standard-list-management/standard-list-management.component';
import { HomeCongregationComponent } from '../pages/tps/congregation/home-congregation/home-congregation.component';
import { CongregationInfoComponent } from '../pages/tps/congregation/congregation-info/congregation-info.component';
import { CreateNewCongregationComponent } from '../pages/tps/congregation/create-new-congregation/create-new-congregation.component';
import { FilesListComponent } from '../pages/mis/files/files-list/files-list.component';
import { FilesDashboardComponent } from '../pages/mis/files/files-dashboard/files-dashboard.component';
import { FilesUploadComponent } from '../pages/mis/files/files-upload/files-upload.component';
import { HomeCongregationMisComponent } from '../pages/mis/congregation-mis/home-congregation-mis/home-congregation-mis.component';
import { EditCongregationComponent } from '../pages/tps/congregation/edit-congregation/edit-congregation.component';
import { EqaTpsHomeComponent } from '../pages/tps/eqa-tps/eqa-tps-home/eqa-tps-home.component';
import { EvidenceInfoComponent } from '../pages/tps/eqa-tps/evidence-info/evidence-info.component';
import { EvidenceEditComponent } from '../pages/tps/eqa-tps/evidence-edit/evidence-edit.component';
import { EvidenceDeleteComponent } from '../pages/tps/eqa-tps/evidence-delete/evidence-delete.component';
import { Home2CongregationComponent } from '../pages/mis/congregation-mis/home2-congregation/home2-congregation.component';
import { CheckStudentRegistedComponent } from '../pages/mis/congregation-mis/check-student-registed/check-student-registed.component';
import { EvidenceListComponent } from '../pages/mis/eqa/evidence-list/evidence-list.component';
/*
*     Location
*/

import { LocationHomeComponent } from '../pages/mis/location/location-home/location-home.component';
import { CreateLocationComponent } from '../pages/mis/location/create-location/create-location.component';
import { EditLocationComponent } from '../pages/mis/location/edit-location/edit-location.component';
import { RemoveLocationComponent } from '../pages/mis/location/remove-location/remove-location.component';

import { AuthService } from '../service/users/auth.service';

const SATIT_ROUTES: Routes = [
  {
    path: 'authorities',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children:
    [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  {
    path: 'ระบบส่งหลักฐานประกันคุณภาพการศึกษา',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children: [
      {
        path: '',
        component: EqaTpsHomeComponent
      },
      {
        path: 'หน้าแรก',
        component: EqaTpsHomeComponent
      },
      {
        path: 'ข้อมูลหลักฐาน/:id/:name',
        component: EvidenceInfoComponent
      },
      {
        path: 'แก้ไขคำอธิบายที่มาของหลักฐาน/:id/:name',
        component: EvidenceEditComponent
      },
      {
        path: 'ลบหลักฐาน/:id/:name',
        component: EvidenceDeleteComponent
      }
    ]
  },
  {
    path: 'กิจกรรมพัฒนาผู้เรียน-ชุมนุม',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children: [
      {
        path: '',
        component: Home2CongregationComponent
      },
      {
        path: 'หน้าแรก',
        component: Home2CongregationComponent
      },
      {
        path: 'ตรวจสอบนักเรียนลงทะเบียน',
        component: CheckStudentRegistedComponent
      },
      {
        path: 'รายการชุมนุม',
        component: HomeCongregationMisComponent
      },
      {
        path: 'ข้อมูลชุมนุม/:id',
        component: CongregationInfoComponent
      },
      {
        path: 'แก้ไขข้อมูลชุมนุม/:id',
        component: EditCongregationComponent
      }
    ]
  },
  {
    path: 'สถานที่',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children: [
      {
        path: '',
        component: LocationHomeComponent
      },
      {
        path: 'หน้าแรก',
        component: LocationHomeComponent
      },
      {
        path: 'สร้างข้อมูลอาคารและสถานที่/:method',
        component: CreateLocationComponent
      },
      {
        path: 'แก้ไขข้อมูลอาคารและสถานที่',
        component: EditLocationComponent
      },
      {
        path: 'ลบข้อมูลอาคารและสถานที่',
        component: RemoveLocationComponent
      }
    ]
  },
  {
    path: 'Files',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children: [
      {
        path: '',
        component: FilesDashboardComponent
      },
      {
        path: 'Home',
        component: FilesDashboardComponent
      },
      {
        path: 'editFolder',
        component: FileList
      },
      {
        path: 'inFolder',
        component: FileList
      },
      {
        path: 'upload',
        component: FilesUploadComponent
      },
      {
        path: 'editFile/:id',
        component: FilesUploadComponent
      }
    ]
  },
  {
    path: 'ระบบจัดการวิชาชุมนุมของครู',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children: [
      {
        path: '',
        component: HomeCongregationComponent
      },
      {
        path: 'Info/:id',
        component: CongregationInfoComponent
      },
      {
        path: 'Home',
        component: HomeCongregationComponent
      },
      {
        path: 'ตั้งรายวิชาชุมนุมใหม่',
        component: CreateNewCongregationComponent
      },
      {
        path: 'แก้ไขชุมนุม/:id',
        component: EditCongregationComponent
      }
    ]
  },
  {
    path: 'EQA',
    component: MainPageComponent,
    canActivateChild: [LogedinGuard],
    children:
    [
      {
        path: 'Home',
        component: EqaHomeComponent
      },
      {
        path: 'StandardManagement',
        component: StandardManagementComponent
      },
      {
        path: 'standard-list',
        component: StandardListManagementComponent
      },
      {
        path: 'StandardManagement/:year',
        component: StandardManagementComponent
      },
      {
        path: 'StandardManagement/:year/:level2',
        component: StandardManagementComponent
      },
      {
        path: 'StandardManagement/:year/:level2/:level3',
        component: StandardManagementComponent
      },
      {
        path: 'AddList/:id/:year',
        component: AddStandardListComponent
      },
      {
        path: 'EditStandardItem/:id',
        component: EditStandardItemComponent
      },
      {
        path: 'RoleManagement',
        component: SettingRoleManagementComponent
      },
      {
        path: 'รายการหลักฐาน',
        component: EvidenceListComponent
      }
    ]
  },
  { path: '404', component: LoginPageComponent },
  { path: './login', component: LoginPageComponent },
  { path: '', redirectTo: './login', pathMatch: 'prefix' },
  { path: '**', redirectTo: './login', pathMatch: 'prefix' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(SATIT_ROUTES),
  ],
  providers: [
    LogedinGuard,
    AuthService
  ]
})
export class AppRoutesModule {
}
