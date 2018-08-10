import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder
} from '@covalent/core';
import { routerAnimation } from '../../../../utils/page.animation';
import { EqaService } from '../../../../service/eqa.service';


@Component({
  selector: 'app-add-standard-list',
  template: '../eqa-template.html',
  templateUrl: './add-standard-list.component.html',
  styleUrls: ['./add-standard-list.component.scss', '../eqa-template.scss'],
  animations: [routerAnimation]
})
export class AddStandardListComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  @HostBinding('@routerAnimation') routerAnimation = true;

  parent_id: any;
  year: any;
  listText: any;
  formError = false;
  formErrorText = "*ไม่พบข้อมูลที่จะบันทึก";
  readYear = false;
  readTopic = true;
  greetMessage = "เพิ่มรายการมาตรฐานประจำปีการศึกษา";
  iconGreet = "add";
  text: any;
  urlParam: any;


  constructor(private route: ActivatedRoute, private router: Router, private eqa: EqaService) { }

  ngOnInit() {
    this.route.params.subscribe( param => {
      this.urlParam = param;
    });
    this.parent_id = this.urlParam.id;
    this.year = this.urlParam.year;
    if (this.urlParam.id == -1) {
      this.listText = "มาตรฐานหลัก";
      this.readYear = true;
    } else if ((this.parent_id == -2) && (this.year == 0)) {
      this.greetMessage = "ตั้งปีการศึกษาใหม่";
      this.iconGreet = "playlist_add";
      this.year = "";
      this.listText = "มาตรฐานหลัก";
      this.readTopic = true;
      this.readYear = false;
    } else {
      this.eqa.getStandardItem(window.localStorage.getItem('token'), this.urlParam.id).then(resReturn => {
        let item = JSON.parse(resReturn['item']);
        this.listText = item[0].text;
        this.readYear = true;
      });
    }
  }

  navigateBack() {
    this.router.navigateByUrl('/EQA/standard-list');
  }

  save() {
    if (this.text == "") {
      this.formError = true;
    } else {
      this.formError = false;
      // tslint:disable-next-line:max-line-length
      if ((this.urlParam.id == -2)) {
        this.eqa.addNewStandardItem(window.localStorage.getItem('token'), this.text, -1, this.year).then(resReturn => {
          this.router.navigateByUrl('/EQA/standard-list');
        });
      }else{
        // tslint:disable-next-line:max-line-length
        this.eqa.addNewStandardItem(window.localStorage.getItem('token'), this.text, this.urlParam.id, this.year).then(resReturn => {
          this.router.navigateByUrl('/EQA/standard-list');
        });
      }
    }
  }

}
