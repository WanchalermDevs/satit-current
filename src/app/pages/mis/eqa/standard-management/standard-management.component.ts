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
import { routerAnimation } from '../../../../utils/page.animation';

import { EqaService } from '../../../../service/eqa.service';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);
@Component({
  selector: 'app-standard-management',
  templateUrl: './standard-management.component.html',
  styleUrls: ['./standard-management.component.scss']
})
export class StandardManagementComponent implements OnInit {

  columnsStandard: ITdDataTableColumn[] = [
    { name: 'no', label: '#', width: 55 },
    { name: 'text', label: 'มาตรฐาน' },
    { name: 'year', label: 'ปีการศึกษา', width: 120 },
    { name: 'subStandardList', label: 'จำนวนมาตรฐานย่อย', numeric: true, format: NUMBER_FORMAT, width: 100 }
  ];
  standardList: any[] = [];
  // Table parameters
  filteredData: any[] = this.standardList;
  filteredTotal: number = this.standardList.length;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 5;
  sortBy = 'text';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  selectedList = [];
  subStandardText: any;

  states = [];
  auto: any;
  filteredStates: any;
  stateCtrl: any;
  selectYear: any;
  parent_id: any;

  canSelect = false;
  canMultiple = false;

  urlParam: any;
  urlLength: any;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private _dataTableService: TdDataTableService, private eqa: EqaService, private activeRoute: ActivatedRoute) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      this.urlParam =  param;
    })
    // tslint:disable-next-line:quotemark
    this.activeRoute.url.subscribe(url => {
      this.urlLength = url;
    });
    this.filter();
    this.eqa.yearList(window.localStorage.getItem('token')).then(resReturn => {
      const yearList = JSON.parse(resReturn['list']);
      this.states = [];
      yearList.forEach(element => {
        let temp = {
          text: element.text,
          value: element.text
        };
        this.states.push(temp);
      });
    });

    if (this.urlLength.length == 1) {
      this.showStandardListToTable(0);
      this.subStandardText = "";

    } else if (this.urlLength.length == 2) {
      this.subStandardText = "";
      if (this.urlParam.year != undefined) {
        this.parent_id = -1;
        this.showStandardListToTable(this.urlParam.year);
        this.selectYear = this.urlParam.year;
      }
    } else if (this.urlLength.length == 3) {
      // this.subStandardText = "รายการมาตรฐานย่อย";
      this.parent_id = this.urlParam.level2;
      this.selectYear = this.urlParam.year;
      this.eqa.getStandardItem(window.localStorage.getItem('token'), this.parent_id).then((resReturn) => {
        let temp = JSON.parse(resReturn['item']);
        this.subStandardText = "รายการย่อยของ มาตรฐาน/ประเด็น " + temp[0].text;
      });
      this.showStandardListToTable(this.selectYear);
    } else if (this.urlLength.length == 4) {
      this.parent_id = this.urlParam.level3;
      this.selectYear = this.urlParam.year;
      this.eqa.getStandardItem(window.localStorage.getItem('token'), this.parent_id).then((resReturn) => {
        let temp = JSON.parse(resReturn['item']);
        this.subStandardText = "รายการย่อยชั้นที่ 3 ของ มาตรฐาน/ประเด็น " + temp[0].text;
      });
      this.showStandardListToTable(this.selectYear);
    }
  }

  selectItemForEdit() {
    this.canSelect = true;
    this.canMultiple = false;
  }

  selectForRemove() {
    this.canSelect = true;
    this.canMultiple = true;
  }

  private showStandardListToTable(year) {
    let state = year;
    this.eqa.standardListByYear(window.localStorage.getItem('token'), state).then(resReturn => {
      let stdList = JSON.parse(resReturn['list']);
      let i = 1;
      this.standardList = [];
      stdList.forEach(element => {
        if (element.parent_id == this.parent_id) {
          let temp = {
            'id': element.id,
            'parent_id': element.parent_id,
            'no': i++,
            'text': element.text,
            'year': element.year,
            'subStandardList': 0
          };
          this.parent_id = element.parent_id;
          this.standardList.push(temp);
        }
      });
      this.canSelect = false;
      this.canMultiple = false;
      this.filter();
    });
  }

  selectedTakeRemove() {
    // alert(this.selectedList.length);
    if (this.selectedList.length == 0) {
      alert("ไม่ได้เลือก");
    } else {
      this.selectedList.forEach(element => {
        console.log(JSON.parse(element).id);
        this.eqa.removeStandardItem(window.localStorage.getItem('token'), JSON.parse(element).id).then(resReturn => { });
      });
      this.showStandardListToTable(this.selectYear);
    }
    this.navigateBack();
  }

  getStandardListByYear() {
    this.router.navigateByUrl('/EQA/StandardManagement/' + this.selectYear);
    this.showStandardListToTable(this.selectYear);
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gi').test(s)) : this.states;
  }

  gotoAddList() {
    this.router.navigateByUrl('/EQA/AddList/' + this.parent_id + '/' + this.selectYear);
  }

  gotoNewEducationYear() {
    this.router.navigateByUrl('/EQA/AddList/-2/0');
  }

  gotoSubStandardLevel2(id) {
    this.router.navigateByUrl('/EQA/AddList/' + this.parent_id + '/' + this.selectYear);
  }

  navigateBack() {
    if (this.urlLength.length == 1) {
      this.router.navigateByUrl('/EQA/Home');

    } else if (this.urlLength.length == 2) {
      this.router.navigateByUrl('/EQA/StandardManagement');
      this.showStandardListToTable(0);
    } else if (this.urlLength.length == 3) {
      this.router.navigateByUrl('/EQA/StandardManagement/' + this.selectYear);
      this.showStandardListToTable(this.selectYear);
    } else if (this.urlLength.length == 4) {
      this.router.navigateByUrl('/EQA/StandardManagement/' + this.selectYear + '/' + this.urlParam.level2);
      this.showStandardListToTable(this.selectYear);
    } else {
      this.router.navigateByUrl('/EQA/Home');
    }
  }

  rowClick(event: ITdDataTableRowClickEvent): void {
    console.log(event);
    if (this.urlLength.length == 1) {
    } else if (this.urlLength.length == 2) {
      this.router.navigateByUrl('/EQA/StandardManagement/' + this.selectYear + '/' + event.row.id);
      this.showStandardListToTable(this.selectYear);
    } else if (this.urlLength.length == 3) {
      this.router.navigateByUrl('/EQA/StandardManagement/' + this.selectYear + '/' + this.parent_id + '/' + event.row.id);
      this.showStandardListToTable(this.selectYear);
    } else if (this.urlLength.length == 4) {

    }
  }

  selectedStandardItem(event: ITdDataTableRowClickEvent): void {
    /*
    * มีปัญหาที่ event.selected และ event.rows
    */
    // if (event.selected == true) {
    //   if (event.index != undefined) {
    //     if (this.canMultiple == false) {
    //       this.router.navigateByUrl('/EQA/EditStandardItem/' + event.row.id);
    //     } else {
    //       this.selectedList.push(JSON.stringify(event.row));
    //     }
    //   } else {
    //     // event.rows.forEach(element => {
    //     //   this.selectedList.push(JSON.stringify(element));
    //     // });
    //   }
    // } else {
    //   if (event.index == undefined) {
    //     this.selectedList = [];
    //   } else {
    //     let index = this.selectedList.indexOf(JSON.stringify(event.row));
    //     this.selectedList.splice(index, 1);
    //   }
    // }
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
    let newData: any[] = this.standardList;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}