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
  selector: 'app-home2-congregation',
  templateUrl: './home2-congregation.component.html',
  styleUrls: ['./home2-congregation.component.scss'],
  animations: [routerAnimation]
})
export class Home2CongregationComponent implements OnInit {

  constructor(
    private _dataTableService: TdDataTableService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService,
    private student: StudentService
  ) { }

  ngOnInit() {
  }

  gotoCongregationList() {
    this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม/รายการชุมนุม');
  }

  gotoCheckStudentRegisted() {
    this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม/ตรวจสอบนักเรียนลงทะเบียน');
  }

}
