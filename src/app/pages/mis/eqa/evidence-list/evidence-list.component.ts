import { Component, HostBinding, OnInit, Input } from '@angular/core';
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
import { FileUploadService } from '../../../../service/files/file-upload.service';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { element } from 'protractor';


const URL = 'http://www.satit.nu.ac.th/nodeUploadFile';
@Component({
  selector: 'app-evidence-list',
  templateUrl: './evidence-list.component.html',
  styleUrls: ['./evidence-list.component.scss'],
  animations: [routerAnimation]
})
export class EvidenceListComponent implements OnInit {

  @HostBinding('@routerAnimation') routerAnimation = true;

  eqaList = [];
  eqaData = [];

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private eqa: EqaService, private fileUpload: FileUploadService) { }

  ngOnInit() {
    this.eqa.standardListByYear(window.localStorage.getItem('token'), '2560').then((resReturn) => {

      let eqa = JSON.parse(resReturn['list']);
      eqa.forEach(element => {
        if (element['evidences'] != "") {
          try {
            element['evidences'] = JSON.parse(element['evidences']);

          } catch (err) {

          }
        }
        try {
          element['owner'] = JSON.parse(element['owner']);
        } catch (err) {

        }
        if (element['parent_id'] === -1) {
          this.eqaData.push(element);
        } else {

        }
        this.eqaList.push(element);
      });

      this.eqaList.forEach(element => {

        if (element['parent_id'] !== -1) {
          console.log(element['parent_id']);
        } else {

        }
      });
      // this.eqaList = eqa;
      console.log(this.eqaList);
      console.log(this.eqaData);
    });
  }

  downloadFile(filename){
    console.log(filename);
    
  }
}