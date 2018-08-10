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


const URL = 'http://www.satit.nu.ac.th/nodeUploadFile';

@Component({
  selector: 'app-eqa-tps-home',
  templateUrl: './eqa-tps-home.component.html',
  styleUrls: ['./eqa-tps-home.component.scss'],
  animations: [routerAnimation]
})
export class EqaTpsHomeComponent implements OnInit {

  @HostBinding('@routerAnimation') routerAnimation = true;

  public uploader: FileUploader = new FileUploader({ url: URL, autoUpload: true });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  currentID;
  currentFile = null;
  currentLink = '';
  selectTypeEvidences = [];

  showFileDescription: boolean = false;

  evidenceList = [];

  eqaList = [];

  activeTabIndex = [];

  originalname = [];
  mimetype = [];
  filesize = [];
  bufferValue = [];
  prograssValue = [];
  isShowPrograssBar = [];

  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private eqa: EqaService, private fileUpload: FileUploadService) { }

  ngOnInit() {
    this.activeTabIndex = [];
    this.evidenceList = [];
    this.eqaList = [];
    this.showFileDescription = false;
    this.currentID = -1;
    this.currentLink = '';
    this.eqa.getMyEqa(window.localStorage.getItem('token')).then((resReturn) => {
      if (resReturn['operation'] == 'success') {
        let eqa = JSON.parse(resReturn['eqa']);

        eqa.forEach(element => {
          console.log(element);
          element['owner'] = JSON.parse(element['owner']);

          if (element['evidences'] != "") {
            // console.log(element['evidences']);
            this.evidenceList = JSON.parse(element['evidences']);
            element['evidences'] = this.evidenceList;
            console.log(this.evidenceList);
          } else {
            element['evidences'] = [];
          }
          this.selectTypeEvidences[element['id']] = 'file';
          // this.bufferValue[element['id']] = 0;
          this.prograssValue[element['id']] = 0;
          this.isShowPrograssBar[element['id']] = false;
          this.eqaList.push(element);
        });
      } else {

      }
      console.log(this.eqaList);
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.isShowPrograssBar[this.currentID] = true;
      console.log(fileItem);
      console.log(progress);
      this.bufferValue[this.currentID] = progress;
      this.prograssValue[this.currentID] = progress;
      // this.currentID = id;
      if(progress === 100){
        this.showFileDescription = true;
        this.isShowPrograssBar[this.currentID] = false;
      }else{
        this.showFileDescription = false;
      }
    };
  }

  onLoadStart() {
    console.log("On Load Start");
  }

  setCurrent(id) {
    this.currentID = id;
    console.log(id);
  }

  mouseClickDropPlace(id) {
    console.log(id);
    this.currentID = id;
    this.showFileDescription = false;
  }

  gotoDownload(filename) {
    window.open('http://www.satit.nu.ac.th/2016/nodeUploadFiles/uploads/' + filename);
  }

  cancleSelectFile() {
    this.currentID = -1;
    this.showFileDescription = false;
  }

  setCurrentLink(id, link) {
    this.currentLink = link;
    this.currentID = id;
    console.log(this.currentLink);
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(e);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    let data = JSON.parse(response);
    let fileResponse = JSON.parse(data['file']);
    console.log(fileResponse);
    this.currentFile = fileResponse;
    // let fileName = document.getElementById('filename' + this.currentID);
    // fileName.innerHTML = this.currentFile['originalname'];
    this.originalname[this.currentID] = this.currentFile['originalname'];

    // let fileType = document.getElementById('filetype' + this.currentID);
    // fileType.innerHTML = this.currentFile['mimetype'];
    this.mimetype[this.currentID] = this.currentFile['mimetype'];

    // let fileSize = document.getElementById('filesize' + this.currentID);
    // fileSize.innerHTML = this.currentFile['size'] + " byte";
    this.filesize[this.currentID] = this.currentFile['size'] + ' byte';

    console.log(this.selectTypeEvidences[this.currentID]);

    if (this.selectTypeEvidences[this.currentID] === 'file') {
      this.showFileDescription = true;
    }

  }

  onDrop(id) {
    this.currentID = id;
  }

  checkHaveEvidences(id) {
    if (this.selectTypeEvidences[id] === 'file') {
      if (this.currentFile === null) {
        return false;
      } else {
        return true;
      }
    } else if (this.selectTypeEvidences[id] === 'link') {
      if (this.currentLink === '') {
        return false;
      } else {
        return true;
      }
    }
  }

  saveEvidence(id, name, descript) {
    console.log(id);
    console.log(name);
    console.log(descript);

    if ((id !== undefined) && name !== undefined && (descript !== undefined) && (this.checkHaveEvidences(id))) {

      this.eqaList.forEach(eqa => {
        if (eqa['id'] === id) {
          let param;

          if (this.selectTypeEvidences[this.currentID] == 'file') {
            param = {
              eqaID: id,
              type: 'file',
              name: name,
              description: descript,
              file: this.currentFile
            };
          } else {
            param = {
              eqaID: id,
              type: 'link',
              name: name,
              description: descript,
              file: this.currentLink
            };


          }

          eqa['evidences'].push(param);
          console.log(this.evidenceList);
          this.eqa.updateEvidence(window.localStorage.getItem('token'), id, eqa['evidences']).then(response => {
            let inputName = <HTMLInputElement>document.getElementById('input-name-' + this.currentID);
            inputName.value = '';

            let inputDescription = <HTMLInputElement>document.getElementById('input-description-' + this.currentID);
            inputDescription.value = '';
            if (this.selectTypeEvidences[this.currentID] == 'file') {

            } else {
              let inpuLink = <HTMLInputElement>document.getElementById('input-link-' + this.currentID);
              inpuLink.value = '';
            }


            console.log(response);
            this.showFileDescription = false;
            this.activeTabIndex[this.currentID] = 0;
            this.selectTypeEvidences[this.currentID] = 'file';
            this.currentID = -1;

            this.ngOnInit();
          });
        }
      });
    } else {
      console.log('ข้อมูลไม่ครบ');
    }
  }

  gotoEvidencesInfo(id, name) {
    this.activatedRoute.params.subscribe(param => {
      this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา/ข้อมูลหลักฐาน/' + id + '/' + name);
    })
  }

  gotoEvidencesDelete(id, name) {
    this.activatedRoute.params.subscribe(param => {
      this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา/ลบหลักฐาน/' + id + '/' + name);
    })
  }

  gotoEvidencesEdit(id, name) {
    this.activatedRoute.params.subscribe(param => {
      this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา/แก้ไขคำอธิบายที่มาของหลักฐาน/' + id + '/' + name);
    })
  }
}


// ["60965767","61981407","59968486","60966023","59961104","60967907","59961760","59964761","60968133","59964907","59965034","59965041","60968409","59965393","60966962","59965782","60967556"]