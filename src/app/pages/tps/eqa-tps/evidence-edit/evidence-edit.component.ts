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
  selector: 'app-evidence-edit',
  templateUrl: './evidence-edit.component.html',
  styleUrls: ['./evidence-edit.component.scss'],
  animations: [routerAnimation]
})
export class EvidenceEditComponent implements OnInit {
  EQA;
  ID: any;
  eqatext: any;
  evidences = [];
  evidencesName: any;
  evidencesDescript: any;
  evidencesType: any;
  evidencesExam: any;
  fileType: any;
  sourceFileName: any;
  isError = false;
  msgError: any = '';
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
            this.ID = item['eqaID'];
            if (item['type'] === 'file') {
              this.fileType = item['file']['mimetype'];
              this.sourceFileName = item['file']['filename'];
            } else {

            }
          }
        });
      });
    });
  }

  edit() {
    let tempEvidence = [];
    this.evidences.forEach(item => {
      if (item['file']['filename'] === this.sourceFileName) {
        console.log(item);
        const temp = {
          name: this.evidencesName,
          type: 'file',
          eqaID: item['eqaID'],
          file: item['file'],
          description: this.evidencesDescript
        };
        tempEvidence.push(temp);
      } else {
        tempEvidence.push(item);
      }
    });
    console.log(tempEvidence);
    this.eqa.updateEvidence(window.localStorage.getItem('token'), this.ID, tempEvidence).then(response => {
      if (response['operation'] == 'success') {
        this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา');
      } else {
        this.isError = true;
      }
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา');
  }

}
