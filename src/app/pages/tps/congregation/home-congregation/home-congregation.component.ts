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

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-home-congregation',
  templateUrl: './home-congregation.component.html',
  styleUrls: ['./home-congregation.component.scss'],
  animations: [routerAnimation]
})
export class HomeCongregationComponent implements OnInit {

  subjectList = [];
  canSelect = false;
  canMultiple = false;
  fromRow = 1;
  currentPage = 1;
  pageSize = 5;
  filteredData: any[] = this.subjectList;
  filteredTotal: number = this.subjectList.length;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  sortBy = 'sequnce';
  searchTerm = '';

  /*
  * ตั้งชื่อ coloumn
  */
  columnsStandard: ITdDataTableColumn[] = [
    { name: 'sequnce', label: '#', width: 55 },
    { name: 'subjectName', label: 'ชื่อวิชา' },
    { name: 'teacher', label: 'ครูผู้สอน', width: 270 },
    { name: 'edu_semester', label: 'ภาคเรียน', numeric: true, width: 100 },
    { name: 'edu_year', label: 'ปีการศึกษา', numeric: true, width: 100 },
    { name: 'location', label: 'สถานที่', numeric: true, width: 300 }
  ];

  // tslint:disable-next-line:max-line-length
  constructor(private _dataTableService: TdDataTableService, private activeRoute: ActivatedRoute, private router: Router, private cgt: CongregationService, private locationService: LocationService) { }

  // ngOnInit() {
  //   this.cgt.myCongregationAll(window.localStorage.getItem('token')).then((resReturn) => {
  //     if (resReturn['operation'] === "fail") {

  //     } else {
  //       // console.log(resReturn);
  //       this.subjectList = resReturn['subject'];
  //       this.subjectList = [];
  //       resReturn['subject'].forEach((item) => {
  //         let info = JSON.parse(item['info']);
  //         let teachers = JSON.parse(item['teacher']);
  //         let teacherText = "";
  //         teachers.forEach((element) => {
  //           // tslint:disable-next-line:max-line-length
  //           teacherText += element['personal_title_name_th'] + element['personal_first_name_th'] + " " + element['personal_last_name_th'] + "\r\n";
  //         });
  //         let LocationText = "";
  //         this.locationService.getLocationInfo(window.localStorage.getItem('token'), item['location']).then((resReturn2) => {
  //           let building = JSON.parse(resReturn2['building'])[0];
  //           let buildingInfo = JSON.parse(building['info']);
  //           // console.log(buildingInfo);
  //           if(building['type'] === "room"){
  //             LocationText = buildingInfo['roomName'];
  //           }else if(building['type'] === "subPlace"){
  //             LocationText = buildingInfo['subPlaceName'];
  //           }
  //           let temp = {
  //             'id': item.id,
  //             'subjectName': item.name,
  //             'teacher': teacherText,
  //             'edu_semester': info.edu_semester,
  //             'edu_year': info.edu_year,
  //             'studentLimit': info.studentLimit,
  //             'studentSubmit': 0,
  //             'location': LocationText
  //           };
  //           this.subjectList.push(temp);
  //           this.bindingData();
  //         });
  //         this.bindingData();
  //       });
  //       console.log(this.subjectList);
  //       this.bindingData();
  //     }
  //   });


  // }

  ngOnInit() {
    this.cgt.myCongregationAll(window.localStorage.getItem('token')).then((resReturn) => {
      if (resReturn['operation'] === "fail") {

      } else {
        this.subjectList = resReturn['subject'];
        this.subjectList = [];
        let count = 1;
        resReturn['subject'].forEach((item) => {
          let info = JSON.parse(item['info']);
          let teachers = JSON.parse(item['teacher']);
          let teacherText = "";
          teachers.forEach((element) => {
            // tslint:disable-next-line:max-line-length
            teacherText += element['personal_title_name_th'] + element['personal_first_name_th'] + " " + element['personal_last_name_th'] + "\r\n";
          });
          this.locationService.getLocationInfo(window.localStorage.getItem('token'), item['location']).then((response: Array<{}>) => {
            let building = JSON.parse(response['building'])[0];
            console.log(building);
            let info = JSON.parse(building['info']);
            let getLocationText = "";
            if (building['type'] == "room") {
              getLocationText = (info['roomName']);
            } else if (building['type'] == "subPlace") {
              getLocationText = (info['subPlaceName']);
            }
            info = JSON.parse(item['info']);
            let temp = {
              'sequnce': count++,
              'id': item.id,
              'subjectName': item.name,
              'teacher': teacherText,
              'edu_semester': info.edu_semester,
              'edu_year': info.edu_year,
              'studentLimit': info.studentLimit,
              'studentSubmit': getLocationText,
              'location': getLocationText
            };
            console.log(temp);
            this.subjectList.push(temp);
            this.filter();
          });
        });
      }
    });
  }

  bindingData() {
    let newData: any[] = this.subjectList;
    this.filteredTotal = this.subjectList.length;
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
  }

  newCongregationSubject() {
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/ตั้งรายวิชาชุมนุมใหม่');
  }

  rowClick(event: ITdDataTableRowClickEvent): void {
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Info/' + event.row.id);
    console.log(event);
  }
  
  filter(): void {
    let newData: any[] = this.subjectList;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

}
