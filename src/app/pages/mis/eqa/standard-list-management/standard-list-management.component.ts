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

@Component({
  selector: 'app-standard-list-management',
  templateUrl: './standard-list-management.component.html',
  styleUrls: ['./standard-list-management.component.scss', '../eqa-template.scss'],
  animations: [routerAnimation]
})
export class StandardListManagementComponent implements OnInit {

  @HostBinding('@routerAnimation') routerAnimation = true;

  selectedYear: any;
  yearsList: any;

  standardList = [];


  constructor(private route: ActivatedRoute, private router: Router, private eqa: EqaService) { }

  ngOnInit() {
    this.eqa.yearList(window.localStorage.getItem('token')).then(resReturn => {
      const years = JSON.parse(resReturn['list']);
      this.yearsList = [];
      years.forEach(element => {
        // tslint:disable-next-line:prefer-const
        let temp = {
          text: element.text,
          value: element.text
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

  gotoAddList(parent_id) {
    this.router.navigateByUrl('/EQA/AddList/' + parent_id + '/' + this.selectedYear);
  }

  editAItem(id) {
    this.router.navigateByUrl('/EQA/EditStandardItem/' + id);
  }

  removeAItem(id) {
    // console.log(id);
    this.eqa.removeStandardItem(window.localStorage.getItem('token'), id).then(resReturn => {
      this.standardList = [];
      this.getStandardListByYear();
    });
  }

  private setPrettyList(list = []) {
    this.standardList = [];
    list.forEach((item = []) => {
      if (item['parent_id'] === -1) {
        item.children = [];
        this.standardList.push(item);
      }
    });

    this.standardList.forEach((mainItem = [], index) => {
      // tslint:disable-next-line:prefer-const
      let temp = [];
      list.forEach((item = []) => {
        if (item['parent_id'] === mainItem['id']) {
          item.children = [];
          list.forEach((i = []) => {
            if (i['parent_id'] === item['id']) {
              item.children.push(i);
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

}
