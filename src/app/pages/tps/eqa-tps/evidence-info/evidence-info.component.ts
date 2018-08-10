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

@Component({
  selector: 'app-evidence-info',
  templateUrl: './evidence-info.component.html',
  styleUrls: ['./evidence-info.component.scss'],
  animations: [routerAnimation]
})
export class EvidenceInfoComponent implements OnInit {

  EQA;
  eqatext: any;
  evidences = [];
  evidencesName: any;
  evidencesDescript: any;
  evidencesType: any;
  evidencesExam: any;
  fileType: any;
  sourceFileName: any;
  originalname: any;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private eqa: EqaService, private fileUpload: FileUploadService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.eqa.getStandardItem(window.localStorage.getItem('token'), param.id).then(response => {
        let std = JSON.parse(response['item'])[0];
        console.log(std);
        this.eqatext = std['text'];
        this.evidences = JSON.parse(std['evidences']);
        // console.log(this.evidences);
        this.evidences.forEach(item => {
          if (item['name'] === param.name) {
            console.log(item);
            this.evidencesName = item['name'];
            this.evidencesDescript = item['description'];
            this.evidencesType = item['type'];
            if (item['type'] === 'file') {
              this.fileType = item['file']['mimetype'];
              this.sourceFileName = item['file']['filename'];
              this.originalname = item['file']['originalname'];
            } else {

            }
          }
        });
      });
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา');
  }
}
