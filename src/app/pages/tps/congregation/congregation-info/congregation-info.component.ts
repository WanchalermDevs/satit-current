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
import { StudentService } from '../../../../service/student/student.service';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-congregation-info',
  templateUrl: './congregation-info.component.html',
  styleUrls: ['./congregation-info.component.scss'],
  animations: [routerAnimation]
})
export class CongregationInfoComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;

  mainInfo = [];
  subInfo = [];

  description: any;
  subjectname: any;
  subStandardText: any;
  studentList = [];
  studentListShow = [];

  dataSubject = [];

  filteredData: any[] = this.studentListShow;
  filteredTotal: number = this.studentListShow.length;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 25;
  sortBy = 'text';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  selectedList = [];

  states = [];
  auto: any;
  filteredStates: any;
  stateCtrl: any;
  selectYear: any;
  parent_id: any;

  canSelect = false;
  canMultiple = false;


  roomText = "";
  teacherText = "";
  semesterText = "";
  yearText = "";
  locationText = "";


  columnsStandard: ITdDataTableColumn[] = [
    { name: 'index', label: '#', width: 55 },
    { name: 'code', label: 'รหัสประจำตัว', width: 100 },
    { name: 'firstname', label: 'ชื่อ' },
    { name: 'lastname', label: 'นามสกุล' },
    { name: 'level', label: 'ระดับชั้น', numeric: true, width: 100 },
    { name: 'room', label: 'ห้อง', numeric: true, width: 100 }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private cgt: CongregationService,
    private locationService: LocationService,
    private student: StudentService,
    private _dataTableService: TdDataTableService
  ) {
    this.stateCtrl = new FormControl();
    // this.filteredStates = this.stateCtrl.valueChanges
    //   .startWith(null)
    //   .map(name => this.filterStates(name));
  }

  gotoEdit() {
    this.route.params.subscribe(param => {
      console.log(param);
      this.router.navigateByUrl("/ระบบจัดการวิชาชุมนุมของครู/แก้ไขชุมนุม/" + param.id);
    });
  }

  removeCongregation() {
    if (confirm("แน่ใจว่าคุณต้องการลบชุมนุม " + this.subStandardText)) {
      console.log("ยืนยันลบ");
      this.route.params.subscribe((p) => {
        this.cgt.removeCongregation(window.localStorage.getItem('token'), p.id).then((response) => {
          this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Home');
        });
      });

    } else {
      console.log("ยกเลิก");
    }
  }

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      // this.urlParam =  param;
      this.cgt.congregationInfo(window.localStorage.getItem('token'), param.id).then((resReturn) => {
        let subject = resReturn['subject'][0];
        this.dataSubject = subject;
        console.log(subject);
        this.subStandardText = subject['name'];
        let teacherInfo = JSON.parse(subject['teacher'])[0];
        let subjectInfo = JSON.parse(subject['info']);
        let std = JSON.parse(subject['student']);
        // console.log(student);
        // console.log(this.removeDuplicates(student));
        // console.log(teacherInfo);
        let i = 1;
        std.forEach((element) => {
          // console.log(element);
          this.student.getAStudentInfo(window.localStorage.getItem('token'), element).then(response => {
            console.log(response);
            this.studentList.push(response['student'][0]);
            console.log(JSON.parse(response['student'][0]['nudinfo'])[0].room);
            let stdRoom = '';
            let stdLevel = '';
            if (JSON.parse(response['student'][0]['nudinfo'])[0].room.length > 0) {
              /*
              * มีการกำหนดห้องอยู่จริง ให้ตรวจสอบต่อว่าตรงกับปีการศึกษาของวิชาชุมนุมหรือไม่
              */
              JSON.parse(response['student'][0]['nudinfo'])[0].room.forEach(room => {
                if (room.edu_year === subjectInfo.edu_year) {
                  console.log('มีปีการศึกษาที่ตรงกัน');
                  stdRoom = room.room;
                  stdLevel = room.level;
                } else {
                  console.log('มีปีการศึกษาที่ไม่ตรงกัน');

                }
              });
            } else {
              console.log('ไม่มีการกำหนดปีการศึกษา');
            }
            let temp = {
              'id': response['student'][0].id,
              'index': i++,
              'code': JSON.parse(response['student'][0]['nudinfo'])[0].student_code,
              // tslint:disable-next-line:max-line-length
              'firstname': JSON.parse(response['student'][0]['name'])[0].name_th.prename + JSON.parse(response['student'][0]['name'])[0].name_th.firstname,
              'lastname': JSON.parse(response['student'][0]['name'])[0].name_th.lastname,
              'level': stdLevel,
              'room': stdRoom,
              // tslint:disable-next-line:max-line-length
              'sr': ((stdLevel.toString() === '') ? '-1' : stdLevel.toString()) + stdRoom.toString() + JSON.parse(response['student'][0]['nudinfo'])[0].student_code
            };
            console.log('temp');
            console.log(temp);
            this.studentListShow.push(temp);
            if ((std.length) < i) {
              console.log('filter' + i + ', ' + std.length);
              this.filter();
            }

          });

        });

        // tslint:disable-next-line:max-line-length
        this.teacherText = teacherInfo['personal_title_name_th'] + teacherInfo['personal_first_name_th'] + ' ' + teacherInfo['personal_last_name_th'];
        this.yearText = subjectInfo['edu_year'];
        this.semesterText = subjectInfo['edu_semester'];
        this.locationService.getLocationInfo(window.localStorage.getItem('token'), subject['location']).then((response) => {
          let building = JSON.parse(response['building'])[0];
          // console.log(building);
          let info = JSON.parse(building['info']);
          if (building['type'] == "room") {
            this.locationText = (info['roomName']);
          } else if (building['type'] == "subPlace") {
            this.locationText = (info['subPlaceName']);
          }
        });
        this.description = subjectInfo['description'];
        let divInfo = document.getElementById('subInfo');
        divInfo.innerHTML = this.description;
      });
    });
  }

  downloadStudentListExcel() {
    console.log(this.filteredData);
    this.cgt.createListOfMemberExcel(window.localStorage.getItem('token'), JSON.stringify(this.filteredData), JSON.stringify(this.dataSubject)).then(response => {
      console.log(response);
      window.open('http://localhost:3000?' + 'name=' + this.dataSubject['name'] + '&time=' + response['time'] + '&path=' + response['path'], '_blank');
    });
    //window.open('http://localhost:3000/?data=' + this.packParameter(this.filteredData), '_blank');
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states;
  }

  navigateBack() {
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Home');
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.fromRow = 1;
    this.currentPage = 1;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  sortByKey(array, key, next) {
    const sourt = array.sort(function (a, b) {
      let x = a[key]; let y = b[key];
      // console.log('X: ' + x + ' Y: ', + y);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    next(sourt);
  }

  setIndex(data, next){
    data.forEach((item, i) => {
      data[i]['index'] = (i + 1);
    });
    next(data);
  }

  filter(): void {
    // console.log(this.studentListShow);

    this.sortByKey(this.studentListShow, 'sr', (data) => {
      // console.log(data);
      this.setIndex(data, (data2) => {
        this.bindDataTable(data2);
      });
    });
  }

  bindDataTable(data) {
    let newData: any[] = data;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    // newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  selectedStandardItem(event: ITdDataTableRowClickEvent): void {
  }

  rowClick(event: ITdDataTableRowClickEvent): void {
  }
}
