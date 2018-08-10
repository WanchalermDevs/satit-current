import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


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
  selector: 'app-edit-standard-item',
  templateUrl: './edit-standard-item.component.html',
  styleUrls: ['./edit-standard-item.component.scss', '../eqa-template.scss'],
  animations: [routerAnimation]
})
export class EditStandardItemComponent implements OnInit {
  // tslint:disable-next-line:member-ordering
  @HostBinding('@routerAnimation') routerAnimation = true;

  parent_id: any;
  year: any;
  text: any;
  listText: any;
  formError = false;
  formErrorText = "*ไม่พบข้อมูลที่จะบันทึก";
  readYear = false;
  readTopic = true;
  greetMessage = "แก้ไขรายการมาตรฐาน";
  iconGreet = "edit";
  urlParam: any;

  constructor(private route: ActivatedRoute, private router: Router, private eqa: EqaService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.urlParam = param;
    });
    this.parent_id = this.urlParam.id;
    this.readTopic = true;
    this.readYear = true;
    this.eqa.getStandardItem(window.localStorage.getItem('token'), this.parent_id).then((resReturn) => {
      let item = JSON.parse(resReturn['item']);
      this.year = item[0].year;
      if(item[0].parent_id == -1){
        this.listText = "หัวข้อหลัก";
      }else{
        this.listText = item[0].text;
      }
      this.text = item[0].text;
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/EQA/standard-list');
  }

  save(myText) {
    this.eqa.editStandardItem(window.localStorage.getItem('token'), this.parent_id, myText).then((resReturn) => {
        this.router.navigateByUrl('/EQA/standard-list');
    });
  }

}
