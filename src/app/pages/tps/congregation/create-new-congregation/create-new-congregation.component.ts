
import {map, startWith} from 'rxjs/operators';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableRowClickEvent,
  ITdDataTableSelectEvent
} from '@covalent/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatDialog } from '@angular/material';
import { routerAnimation } from '../../../../utils/page.animation';
import { QuillModule } from 'ngx-quill';
import { NgModule } from '@angular/core';

import { EqaService } from '../../../../service/eqa.service';
import { AuthService } from '../../../../service/users/auth.service';
import { CongregationService } from '../../../../service/congregation/congregation.service';
import { LocationService } from '../../../../service/location/location.service';

@Component({
  selector: 'app-create-new-congregation',
  templateUrl: './create-new-congregation.component.html',
  styleUrls: ['./create-new-congregation.component.scss'],
  animations: [routerAnimation]
})
export class CreateNewCongregationComponent implements OnInit {

  @HostBinding('@routerAnimation') routerAnimation = true;
  model;
  auto;
  year = "2561";
  semester = "1";
  subjectName: any;
  studentLimit = "25";
  stateCtrl: FormControl;
  filteredStates: any;
  levelData = [
    {
      text: "มัธยมศึกษาตอนปลาย",
      value: "low"
    },
    {
      text: "มัธยมศึกษาตอนต้น",
      value: "high"
    }
  ];
  selectedLevel: any;
  formError = false;
  teacherList = [];
  staffList = [];
  errorMessage = [];
  states = [];

  selectedLocation;
  selectedSubLocation;


  buildingList = [];

  mainLocation = [];
  subLocation = [];
  selectSubLocationFinaly;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private cgt: CongregationService, private locationService: LocationService) {
    this.stateCtrl = new FormControl();
    this.auth.getUserInfo(window.localStorage.getItem('token')).then((resReturn2) => {
      console.log(resReturn2);

      // this.showName(resReturn2['user_id']);
      this.auth.getAllSatitAuthorities(window.localStorage.getItem('token')).then((resReturn: Array<{}>) => {
        this.staffList = resReturn;
        resReturn.forEach(element => {
          let temp = {
            id: element['personal_id'],
            pre_name_th: element['personal_title_name_th'],
            name: element['personal_first_name_th'] + " " + element['personal_last_name_th']
          };
          // console.log(temp);
          this.states.push(temp);
          if (element['personal_id'] == resReturn2['user_id']) {
            this.showName(resReturn2['user_id']);
            console.log(resReturn2['user_id']);
            this.teacherList.push(element);
          }
        });
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(null),
          map(name => this.filterStates(name)),);

      });
    });



  }

  selectedLocationChange() {
    console.log(this.selectedLocation);
    this.subLocation = [];
    this.selectedSubLocation = "";
    this.selectSubLocationFinaly = undefined;
    this.buildingList.forEach((item) => {
      if ((item['type'] === "room")) {
        if (item['info']['buildingID'] == this.selectedLocation) {
          let temp = {
            id: item['id'],
            text: item['info']['roomName']
          }
          this.subLocation.push(temp);
        }
      } else if ((item['type'] === "subPlace")) {
        if (item['info']['placeID'] == this.selectedLocation) {
          let temp = {
            id: item['id'],
            text: item['info']['subPlaceName']
          }
          this.subLocation.push(temp);
        }
      }
    });
    console.log(this.subLocation);
  }

  selectedSubLocationChange() {
    this.buildingList.forEach((item) => {
      if (item['id'] == this.selectedSubLocation) {
        console.log(item);
        this.selectSubLocationFinaly = JSON.stringify(item);
      }
    });
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gu').test(s.name)) : this.states;
  }

  ngOnInit() {
    this.locationService.getAllBuilding(window.localStorage.getItem('token')).then((resReturn) => {
      // console.log(resReturn);
      let building = JSON.parse(resReturn['building']);

      building.forEach(item => {
        // console.log(item);
        item['info'] = JSON.parse(item['info']);
        if ((item['type'] === "building") || (item['type'] === "place")) {
          this.mainLocation.push(item);
        }
        this.buildingList.push(item);
      });
      // console.log(this.mainLocation);
    });
  }

  remoceSelectedTeacher(id) {
    this.teacherList.forEach((item, i) => {
      if (item['personal_id'] === id) {
        let temp = {
          id: item['personal_id'],
          pre_name_th: item['personal_title_name_th'],
          name: item['personal_first_name_th'] + " " + item['personal_last_name_th']
        };
        this.states.push(temp);
        this.teacherList.splice(i, 1);
      }
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Home');
  }

  submit() {
    let check = true;
    this.errorMessage = [];
    // if ((this.year === "") || (this.year === undefined)) {
    //   // console.log("โปรดระบุปีการศึกษา");
    //   this.errorMessage.push("โปรดระบุปีการศึกษา");
    //   check = false;
    // } else {
    //   check = true;
    // }

    // if ((this.semester === "") || (this.semester === undefined)) {
    //   this.errorMessage.push("โปรดระบุภาคเรียน");
    //   check = false;
    // }

    // if ((this.selectedLevel === "") || (this.selectedLevel === undefined)) {
    //   this.errorMessage.push("โปรดระบุปีช่วงชั้น");
    //   check = false;
    // }

    if ((this.subjectName === "") || (this.subjectName === undefined)) {
      this.errorMessage.push("โปรดระบุชื่อชุมนุม");
      check = false;
    }

    // if ((this.teacherList.length === 0) || (this.teacherList === undefined)) {
    //   this.errorMessage.push("โปรดระบุครูผู้สอน");
    //   check = false;
    // }

    // if ((this.studentLimit === "") || (this.studentLimit === undefined)) {
    //   this.errorMessage.push("โปรดระบุจำนวนนักเรียน");
    //   check = false;
    // }
    if (check === true) {
      const param = {
        edu_year: this.year,
        edu_semester: this.semester,
        level: this.selectedLevel,
        subjectName: this.subjectName,
        teachers: this.teacherList,
        studentLimit: this.studentLimit,
        description: JSON.stringify(this.model).slice(1, -1),
        location: this.selectedSubLocation
      };
      console.log(param);
      this.cgt.createNewCongregation(window.localStorage.getItem('token'), param).then((resReturn) => {
        console.log(resReturn);
        if (resReturn['operation'] === "fail") {
          this.errorMessage.push(resReturn['message']);
          this.formError = true;
        } else {
          this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Home');
        }
      });
    } else {
      this.formError = true;
    }
  }

  showName(id) {
    this.staffList.forEach((obj, i) => {
      if (obj['personal_id'] === id) {
        this.teacherList.push(obj);
        this.states.splice(i, 1);
      }
    });
  }
}
