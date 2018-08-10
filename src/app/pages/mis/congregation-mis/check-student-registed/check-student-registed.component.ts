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

import { EqaService } from '../../../../service/eqa.service';
import { CongregationService } from '../../../../service/congregation/congregation.service';
import { LocationService } from '../../../../service/location/location.service';
import { StudentService } from '../../../../service/student/student.service';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);


@Component({
  selector: 'app-check-student-registed',
  templateUrl: './check-student-registed.component.html',
  styleUrls: ['./check-student-registed.component.scss'],
  animations: [routerAnimation]
})
export class CheckStudentRegistedComponent implements OnInit {

  studentList = [];
  studentListShow = [];

  filteredData: any[] = this.studentListShow;
  filteredTotal: number = this.studentListShow.length;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 250;
  sortBy = 'text';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  selectedList = [];
  canSelect = false;
  canMultiple = false;
  stateCtrl: any;
  filteredStates: any;
  states = [];

  isRegisted = true;

  eduYear: any;
  eduLevel: any = 0;

  columnsStandard: ITdDataTableColumn[] = [
    { name: 'index', label: '#', width: 55 },
    { name: 'code', label: 'รหัสประจำตัว', width: 100 },
    { name: 'firstname', label: 'ชื่อ' },
    { name: 'lastname', label: 'นามสกุล' },
    { name: 'level', label: 'ระดับชั้น', numeric: true, width: 100 },
    { name: 'room', label: 'ห้อง', numeric: true, width: 100 },
    { name: 'subject', label: 'วิชาชุมนุม' }
  ];

  constructor(
    private _dataTableService: TdDataTableService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService,
    private student: StudentService
  ) {
    this.isRegisted = true;
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  checkRegisted(stdCode, next) {
    // console.log(stdCode);
    this.cgt.checkStudentRegisted(window.localStorage.getItem('token'), stdCode).then(subject => {
      if(subject['subject'].length > 1){
        console.log(stdCode);
        console.log(subject['subject']);
      }
      // console.log(subject['subject'].length);
      next(subject);
    });
  }

  showDontRegist(level) {
    this.eduLevel = level;
    this.studentListShow = [];
    this.ngOnInit();
  }

  ngOnInit() {
    if (this.eduLevel !== 0) {
      this.student.getStudentInfoList(window.localStorage.getItem('token'), '2561', this.eduLevel).then(resultStudent => {
        const student = resultStudent['student'];
        this.studentListShow = [];
        student.forEach((std, i) => {
          let info = JSON.parse(std['nudinfo'])[0];
          // console.log(info);
          this.checkRegisted(info['student_code'], (subjects) => {
            let subjectName = '-';
            if (subjects['subject'].length > 0) {
              const subject = subjects['subject'][0];
              subjectName = subject['name'];
              const tempList = {
                'code': info['student_code'],
                'firstname': JSON.parse(std['name'])[0]['name_th']['prename'] + JSON.parse(std['name'])[0]['name_th']['firstname'],
                'lastname': JSON.parse(std['name'])[0]['name_th']['lastname'],
                'level': info['room'][0]['level'],
                'room': info['room'][0]['room'],
                'subject': subjectName
              };
              // console.log(tempList);
              if (this.isRegisted) {
                this.studentListShow.push(tempList);
              }
              // this.studentListShow.push(tempList);
            } else {
              const tempList = {
                'code': info['student_code'],
                'firstname': JSON.parse(std['name'])[0]['name_th']['prename'] + JSON.parse(std['name'])[0]['name_th']['firstname'],
                'lastname': JSON.parse(std['name'])[0]['name_th']['lastname'],
                'level': info['room'][0]['level'],
                'room': info['room'][0]['room'],
                'subject': subjectName
              };
              // console.log(tempList);
              if (!this.isRegisted) {
                this.studentListShow.push(tempList);
              }
            }
            // console.log(subject);
            // console.log(info['room']);

            if ((student.length - 1) <= i) {
              console.log('--- filter ---');
              this.filter();
            }
          });
        });
      });
    }
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states;
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

  setIndex(data, next) {
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

  sortByKey(array, key, next) {
    const sourt = array.sort(function (a, b) {
      let x = a[key]; let y = b[key];
      // console.log('X: ' + x + ' Y: ', + y);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    next(sourt);
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
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

  navigateBack() {
    this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม');
  }

}
