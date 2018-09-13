
import { map, startWith } from 'rxjs/operators';
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
  selector: 'app-edit-congregation',
  templateUrl: './edit-congregation.component.html',
  styleUrls: ['./edit-congregation.component.scss'],
  animations: [routerAnimation]
})
export class EditCongregationComponent implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private cgt: CongregationService,
    private locationService: LocationService
  ) {
    this.stateCtrl = new FormControl();
    this.auth.getUserInfo(window.localStorage.getItem('token')).then((resReturn2) => {
      // console.log(resReturn2);

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
            // console.log(resReturn2['user_id']);
            this.teacherList.push(element);
          }
        });
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(null),
          map(name => this.filterStates(name)), );

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
      let building = JSON.parse(resReturn['building']);

      building.forEach(item => {
        item['info'] = JSON.parse(item['info']);
        if ((item['type'] === "building") || (item['type'] === "place")) {
          this.mainLocation.push(item);
        }
        this.buildingList.push(item);
      });
    });
    setTimeout(() => {
      this.setData();
    }, 500);
  }

  setData() {
    this.route.params.subscribe((param) => {
      this.cgt.congregationInfo(window.localStorage.getItem('token'), param.id).then((response) => {
        console.log(response);
        let subject = response['subject'][0];
        this.subjectName = subject['name'];
        let subjectInfo = JSON.parse(subject['info']);
        this.model = subjectInfo['description'];
        
        // console.log(subjectInfo);
        
        this.locationService.getLocationInfo(window.localStorage.getItem('token'), subject['location']).then((resReturn: Array<{}>) => {
          // console.log(resReturn);
          let building = JSON.parse(resReturn['building'])[0];
          let buildingInfo = JSON.parse(building['info']);
          // console.log(buildingInfo);
          if (building['type'] == "room") {
            this.selectedLocation = buildingInfo['buildingID'];
            // console.log("set ID อาคารแล้ว");
          } else if (building['type'] == "subPlace") {
            this.selectedLocation = buildingInfo['placeID'];
          }
          this.selectedLocationChange();
          this.selectedSubLocation = subject['location'];
          // console.log(this.selectedLocation);
        });
      });
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
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/หน้าหลัก');
  }

  submit() {
    let check = true;
    this.errorMessage = [];
    if ((this.subjectName === "") || (this.subjectName === undefined)) {
      this.errorMessage.push("โปรดระบุชื่อชุมนุม");
      check = false;
    }

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
      this.route.params.subscribe((param2) => {
        this.cgt.editCongregation(window.localStorage.getItem('token'), param, param2.id).then((resReturn) => {
          console.log(resReturn);
          if (resReturn['operation'] === "fail") {
            this.errorMessage.push(resReturn['message']);
            this.formError = true;
          } else {
            this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Info/' + param2.id);
          }
        });
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
