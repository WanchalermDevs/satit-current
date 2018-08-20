import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EqaService } from '../../../../service/eqa.service';
import { routerAnimation } from '../../../../utils/page.animation';
import {
  IPageChangeEvent,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableRowClickEvent,
  ITdDataTableSelectEvent,
  ITdDataTableColumn
} from '@covalent/core';


@Component({
  selector: 'app-evaluation-topic',
  templateUrl: './evaluation-topic.component.html',
  styleUrls: ['./evaluation-topic.component.scss'],
  animations: [routerAnimation],
})
export class EvaluationTopicComponent implements OnInit {

  topicId;
  standardList = [];
  currentTopic: any = "";
  childTopic = [];
  searchTerm = '';
  sortBy = 'sequnce';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  fromRow = 1;
  currentPage = 1;
  canSelect = false;
  canMultiple = false;
  filteredData: any[] = this.standardList;
  filteredTotal: number = this.standardList.length;
  hasData = false;
  /*
  * ตั้งชื่อ coloumn
  */
  columnsStandard: ITdDataTableColumn[] = [
    { name: 'childtopic', label: 'ประเด็นพิจารณา' },

  ];
  // Data for creating tabs
  dynamicTabs = [
   {
      label: 'ข้อคิดเห็นปีก่อนหน้า',
      contentDescription:  true,
    }, {
      label: 'หลักฐาน',
      contentEvidences: true,
    }, {
      label: 'ผู้ประสานงาน',
      contentOwners: true,
    },
  ];
  constructor(private activeRoute: ActivatedRoute, private router: Router, private eqaSevice: EqaService, private tdDataSevice: TdDataTableService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.topicId = param['id'];
      this.dataPrepareForTable();
    });
  }
  dataPrepareForTable() {
    this.eqaSevice.standardListByYear(window.localStorage.getItem('token'), '2560').then(param => {
      let list = JSON.parse(param['list']);
      this.childTopic = [];
      this.hasData = false;
      console.log(list);
      list.forEach(element => {

        if (element['id'] == this.topicId) {
          this.currentTopic = element;
          let owner = JSON.parse(element['owner']);
          this.currentTopic['owner'] = owner;
          let evidences = JSON.parse(element['evidences']);
          this.currentTopic['evidences'] = evidences;
          let old_comment = JSON.parse(element['old_comment']);
          this.currentTopic['old_comment'] = old_comment;
          // console.log(owner);
        }
        if (this.topicId == element['parent_id']) {
          let temp = { 
            'childtopic' : element['text'],
            'id' : element['id'],
            'owners' : element['owner'],
          }
          this.childTopic.push(temp);
        }
        if(this.childTopic.length > 0){
          this.hasData = true;
        }
        this.filter();
      });
    })
  }
  rowClick(event: ITdDataTableRowClickEvent) {
    this.router.navigateByUrl('/EQA/ระบบประเมินคุณภาพสถานศึกษา/หัวข้อ/' + event['row']['id']);
  }
  filter(): void {
    let newData: any[] = this.childTopic;
    newData = this.tdDataSevice.filterData(newData, this.searchTerm, true);
    newData = this.tdDataSevice.sortData(newData, this.sortBy, this.sortOrder);
    // newData = this.tdDataSevice.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.childTopic = newData;
  }
}
