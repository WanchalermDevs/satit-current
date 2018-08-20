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
  selector: 'app-home-congregation-mis',
  templateUrl: './home-congregation-mis.component.html',
  styleUrls: ['./home-congregation-mis.component.scss'],
  animations: [routerAnimation]
})
export class HomeCongregationMisComponent implements OnInit {

  constructor(
    private _dataTableService: TdDataTableService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService
  ) { }

  congregationSubjectList = [];
  canSelect = false;
  canMultiple = false;
  fromRow = 1;
  currentPage = 1;
  pageSize = 15;
  filteredData: any[] = this.congregationSubjectList;
  filteredTotal: number = this.congregationSubjectList.length;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  locationList = [];

  sortBy = 'sequnce';
  searchTerm = '';

  columnsStandard: ITdDataTableColumn[] = [
    { name: 'sequnce', label: '#', width: 55 },
    { name: 'subjectName', label: 'ชื่อวิชา' },
    { name: 'teacher', label: 'ครูผู้สอน', width: 270 },
    { name: 'edu_semester', label: 'ภาคเรียน', numeric: true, width: 100 },
    { name: 'edu_year', label: 'จำนวนนักเรียน', numeric: true, width: 100 },
    { name: 'location', label: 'สถานที่', width: 300 }
  ];

  removeDuplicates(arr) {
    let unique_array = []
    for (let i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i])
      }
    }
    return unique_array;
  }

  ngOnInit() {
    this.cgt.getCongregationAll(window.localStorage.getItem('token')).then((resReturn: Array<{}>) => {
      // this.subjectList = resReturn['subject'];
      // this.subjectList = [];
      // console.log(resReturn);
      let sequnce = 1;
      resReturn['subject'].forEach((item) => {
        // console.log(item);
        let student = [];
        try{
          student = JSON.parse(item['student']);
        }catch(error){

        }
        // let student = JSON.parse(item['student']);
        let studentListComplete = this.removeDuplicates(student);
        // console.log(item.text);
        console.log(student);
        // console.log(studentListComplete);
        // this.cgt.updateStudentList(window.localStorage.getItem('token'), item.id, studentListComplete).then(response => {
        //   console.log(response);
        // });
        let info = [];
        try {
          info = JSON.parse(item['info']); 
        } catch (error) {
          console.log(item['info']);
          console.log(error);
        }
        let teachers = JSON.parse(item['teacher']);
        let teacherText = "";
        teachers.forEach((element) => {
          // tslint:disable-next-line:max-line-length
          teacherText += element['personal_title_name_th'] + element['personal_first_name_th'] + " " + element['personal_last_name_th'] + "\r\n";
        });
        this.locationService.getAllBuilding(window.localStorage.getItem('token')).then((resReturn) => {
          this.locationList = JSON.parse(resReturn['building']);
          this.locationList.forEach(local => {
            if (item.location == local.id) {
              if (local.type == "room") {
                // console.log(local);
                let temp = {
                  'sequnce': sequnce++,
                  'id': item.id,
                  'subjectName': item.name,
                  'teacher': teacherText,
                  'edu_semester': info['edu_semester'],
                  // 'edu_year': info['edu_year'],
                  'edu_year': studentListComplete.length,
                  'studentLimit': info['studentLimit'],
                  'studentSubmit': 0,
                  'location': JSON.parse(local['info'])['roomName'],
                  'locationId': item.location
                };
                // console.log(temp);
                this.congregationSubjectList.push(temp);
              } else if (local.type == "subPlace") {
                let temp = {
                  'sequnce': sequnce++,
                  'id': item.id,
                  'subjectName': item.name,
                  'teacher': teacherText,
                  'edu_semester': info['edu_semester'],
                  // 'edu_year': info['edu_year'],
                  'edu_year': studentListComplete.length,
                  'studentLimit': info['studentLimit'],
                  'studentSubmit': 0,
                  'location': JSON.parse(local['info'])['roomName'],
                  'locationId': item.location
                };
                this.congregationSubjectList.push(temp);
              }
              this.filter();
            }
          });
        });
      });
    });
  }

  rowClick(event: ITdDataTableRowClickEvent): void {
    console.log("row Clicked ");
    console.log(event);
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Info/' + event['row']['id']);
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

  filter(): void {
    let newData: any[] = this.congregationSubjectList;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  navigateBack() {
    this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม');
  }
}
