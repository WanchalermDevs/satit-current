
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
import {MatSnackBar} from '@angular/material';

import { EqaService } from '../../../../service/eqa.service';
import { AuthService } from '../../../../service/users/auth.service';

@Component({
  selector: 'app-setting-role-management',
  templateUrl: './setting-role-management.component.html',
  styleUrls: ['./setting-role-management.component.scss', '../eqa-template.scss'],
  animations: [routerAnimation]
})

export class SettingRoleManagementComponent implements OnInit {

  @HostBinding('@routerAnimation') routerAnimation = true;

  selectedYear: any;
  selectedStandard: any;
  yearsList: any;

  standardList = [];
  standardListForSelect = [];
  userList = [];

  selectValue: string;
  stateCtrl: FormControl;
  filteredStates: any;

  states = [];
  auto: any;

  Suggestion: any;

  _sliderTickInterval = 1;
  sliderAutoTicks = false;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private eqa: EqaService, private auth: AuthService, public snackBar: MatSnackBar) {
    this.stateCtrl = new FormControl();
    this.auth.getAllSatitAuthorities(window.localStorage.getItem('token')).then((resReturn: Array<{}>) => {
      // console.log(resReturn);
      // console.log(this.states);
      this.states = resReturn;
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(null),
        map(name => this.filterStates(name)),);
    });
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gu').test(s.personal_first_name_th)) : this.states;
  }

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.eqa.yearList(window.localStorage.getItem('token')).then(resReturn => {
      const years = JSON.parse(resReturn['list']);
      this.yearsList = [];
      years.forEach(element => {
        // tslint:disable-next-line:prefer-const
        let temp = {
          text: element.text,
          value: element.text,
          id: element.id
        };
        this.yearsList.push(temp);
      });
      if (window.localStorage.getItem('selectedYear') !== undefined) {
        this.selectedYear = window.localStorage.getItem('selectedYear');
        this.getStandardListByYear();
      }
    });
  }

  gotoNewEducationYear() {
    this.router.navigateByUrl('/EQA/AddList/-2/0');
  }

  gotoNewMainList() {
    this.router.navigateByUrl('/EQA/AddList/-1/' + this.selectedYear);
  }

  getStandardListByYear() {
    window.localStorage.setItem('selectedYear', this.selectedYear);
    this.eqa.standardListByYear(window.localStorage.getItem('token'), this.selectedYear).then(resReturn => {
      this.setPrettyList(JSON.parse(resReturn['list']));
    });
  }

  remoceSelectedTeacher(id) {
    this.userList.forEach((item, i) => {
      if (item['personal_id'] === id) {
        let temp = {
          id: item['personal_id'],
          pre_name_th: item['personal_title_name_th'],
          name: item['personal_first_name_th'] + " " + item['personal_last_name_th']
        };
        this.states.push(temp);
        this.userList.splice(i, 1);
      }
    });
  }

  gotoAddList(parent_id) {
    this.router.navigateByUrl('/EQA/AddList/' + parent_id + '/' + this.selectedYear);
  }

  editAItem(id) {
    this.router.navigateByUrl('/EQA/EditStandardItem/' + id);
  }

  showName(id) {
    // console.log(id);
    this.states.forEach((obj, i) => {
      if (obj['personal_id'] === id) {
        this.userList.push(obj);
        // this.states.splice(i, 1);
      }
    });
  }

  removeAItem(id) {
    // console.log(id);
    this.eqa.removeStandardItem(window.localStorage.getItem('token'), id).then(resReturn => {
      this.standardList = [];
      this.getStandardListByYear();
    });
  }

  submit() {
    const param = {
      id: this.selectedStandard,
      suggestion: this.Suggestion,
      users: JSON.stringify(this.userList)
    };
    // console.log(param);
    this.eqa.updateSuggestion(window.localStorage.getItem('token'), param).then((resReturn) => {
      // console.log(resReturn);
      this.openSnackBar("บันทึกสำเร็จแล้ว" , "OK");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private setPrettyList(list = []) {
    this.standardList = [];
    this.standardListForSelect = [];
    list.forEach((item = []) => {
      if (item['parent_id'] === -1) {
        item.children = [];
        this.standardList.push(item);
      }
    });
    this.standardList.forEach((mainItem = [], index) => {
      // tslint:disable-next-line:prefer-const
      this.standardListForSelect.push(mainItem);
      let temp = [];
      list.forEach((item = []) => {
        if (item['parent_id'] === mainItem['id']) {
          this.standardListForSelect.push(item);
          item.children = [];
          list.forEach((i = []) => {
            if (i['parent_id'] === item['id']) {
              item.children.push(i);
              this.standardListForSelect.push(i);
            }
          });
          temp.push(item);
        }
      });
      this.standardList[index].children = temp;
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/EQA/Home');
  }

  whenSelectedStandard(id) {
    this.eqa.getStandardItem(window.localStorage.getItem('token'), id).then((resReturn) => {
      let item = JSON.parse(resReturn['item'])[0];
      if(item['owner'] !== ""){
        this.userList = JSON.parse(item['owner']);
      }else{
        this.userList = [];
      }

      if(item['old_comment'] !== ""){
        this.Suggestion = item['old_comment'];
      }else{
        this.Suggestion = item['old_comment'];
      }
    });
  }

}
