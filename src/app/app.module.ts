import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppComponent} from './app.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomFormsModule} from 'ng2-validation';
import { NgModule } from '@angular/core';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {ResizeModule} from './resize/resize.module';
import {AppRoutesModule} from './routes/app-routes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OverlayModule} from '@angular/cdk/overlay';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatExpansionModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import {NgxEchartsModule} from 'ngx-echarts';
import {QuillModule} from 'ngx-quill';
import { AuthService } from './service/users/auth.service';
import { EqaService } from './service/eqa.service';
import { LocationService } from './service/location/location.service';
import { CongregationService } from './service/congregation/congregation.service';
import { StudentService } from './service/student/student.service';
import { FileUploadService } from './service/files/file-upload.service';
import { EqaHomeComponent } from './pages/mis/eqa/eqa-home/eqa-home.component';
import { DashboardComponent } from './pages/mis/authorities/dashboard/dashboard.component';
import { DialogMisEnter } from './pages/mis/authorities/dashboard/dialog-mis-enter.component';
import { StandardManagementComponent } from './pages/mis/eqa/standard-management/standard-management.component';
import { AddStandardListComponent } from './pages/mis/eqa/add-standard-list/add-standard-list.component';
import { EditStandardItemComponent } from './pages/mis/eqa/edit-standard-item/edit-standard-item.component';
import { SettingRoleManagementComponent } from './pages/mis/eqa/setting-role-management/setting-role-management.component';
import { StandardListManagementComponent } from './pages/mis/eqa/standard-list-management/standard-list-management.component';
import { HomeCongregationComponent } from './pages/tps/congregation/home-congregation/home-congregation.component';
import { CreateNewCongregationComponent } from './pages/tps/congregation/create-new-congregation/create-new-congregation.component';
import { CongregationInfoComponent } from './pages/tps/congregation/congregation-info/congregation-info.component';
import {CommonModule} from '@angular/common';
import { FilesDashboardComponent } from './pages/mis/files/files-dashboard/files-dashboard.component';
import { FilesUploadComponent } from './pages/mis/files/files-upload/files-upload.component';
import { LocationHomeComponent } from './pages/mis/location/location-home/location-home.component';
import { CreateLocationComponent } from './pages/mis/location/create-location/create-location.component';
import { EditLocationComponent } from './pages/mis/location/edit-location/edit-location.component';
import { RemoveLocationComponent } from './pages/mis/location/remove-location/remove-location.component';
import { HomeCongregationMisComponent } from './pages/mis/congregation-mis/home-congregation-mis/home-congregation-mis.component';
import { EditCongregationComponent } from './pages/tps/congregation/edit-congregation/edit-congregation.component';
import { EqaTpsHomeComponent } from './pages/tps/eqa-tps/eqa-tps-home/eqa-tps-home.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EvidenceInfoComponent } from './pages/tps/eqa-tps/evidence-info/evidence-info.component';
import { EvidenceEditComponent } from './pages/tps/eqa-tps/evidence-edit/evidence-edit.component';
import { EvidenceDeleteComponent } from './pages/tps/eqa-tps/evidence-delete/evidence-delete.component';
import { Home2CongregationComponent } from './pages/mis/congregation-mis/home2-congregation/home2-congregation.component';
import { CheckStudentRegistedComponent } from './pages/mis/congregation-mis/check-student-registed/check-student-registed.component';
import { EvidenceListComponent } from './pages/mis/eqa/evidence-list/evidence-list.component';
import { EvaluationSystemHomeComponent } from './pages/mis/eqa/evaluation-system-home/evaluation-system-home.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent, MainPageComponent,
    EqaHomeComponent,
    DashboardComponent,
    DialogMisEnter,
    StandardManagementComponent,
    AddStandardListComponent,
    EditStandardItemComponent,
    SettingRoleManagementComponent,
    StandardListManagementComponent,
    HomeCongregationComponent,
    CreateNewCongregationComponent,
    CongregationInfoComponent,
    FilesDashboardComponent,
    FilesUploadComponent,
    LoginPageComponent,
    LocationHomeComponent,
    CreateLocationComponent,
    EditLocationComponent,
    RemoveLocationComponent,
    HomeCongregationMisComponent,
    EditCongregationComponent,
    EqaTpsHomeComponent,
    EvidenceInfoComponent,
    EvidenceEditComponent,
    EvidenceDeleteComponent,
    Home2CongregationComponent,
    CheckStudentRegistedComponent,
    EvidenceListComponent,
    EvaluationSystemHomeComponent
  ],
  entryComponents: [DialogMisEnter
  ],
  imports: [
    CommonModule,
    QuillModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatExpansionModule,
    OverlayModule,
    PortalModule,
    SidemenuModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxEchartsModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    ResizeModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule,
    HttpModule,
    AppRoutesModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  AuthService,
  EqaService,
  CongregationService,
  LocationService,
  FileUploadService,
  StudentService
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
