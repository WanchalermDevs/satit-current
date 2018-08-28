import { Component, OnInit, HostBinding } from '@angular/core';
import { EqaService } from '../../../../service/eqa.service';
import { ITdDataTableColumn } from '../../../../../../node_modules/@covalent/core/data-table';
import { Router } from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder,
  ITdDataTableRowClickEvent,
  ITdDataTableSelectEvent
} from '@covalent/core';
import { routerAnimation } from '../../../../utils/page.animation';

@Component({
  selector: 'app-evaluation-system-home',
  templateUrl: './evaluation-system-home.component.html',
  styleUrls: ['./evaluation-system-home.component.scss'],
  animations: [routerAnimation]
})
export class EvaluationSystemHomeComponent implements OnInit {

  standardList = [];
  searchTerm = '';
  sortBy = 'sequnce';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;
  fromRow = 1;
  currentPage = 1;
  canSelect = false;
  canMultiple = false;
  filteredData: any[] = this.standardList;
  filteredTotal: number = this.standardList.length;
  /*
 * ตั้งชื่อ coloumn
 */
  columnsStandard: ITdDataTableColumn[] = [
    { name: 'sequnce', label: 'รายการมาตรฐาน' },
    { name: 'sar',  label: 'SAR', width: 160 },
    { name: 'car',  label: 'CAR', width: 160 }
  ];

  constructor(private eqa: EqaService, private tdDataSevice: TdDataTableService, private router: Router) {

  }

  ngOnInit() {
    this.eqa.standardListByYear(window.localStorage.getItem('token'), '2560').then(data => {
      let list = JSON.parse(data['list']);
      console.log(list);
      list.forEach(element => {
        let temp = {
          'id': element['id'],
          'sequnce': element['text'],
          'sar': element['owner'],
          'car': element['evaluation']
        }
        if (element['parent_id'] === -1) {
          this.standardList.push(temp);
        }
        this.filter();
      });
    })

  }
  rowClick(event: ITdDataTableRowClickEvent) {
    this.router.navigateByUrl('/EQA/ระบบประเมินคุณภาพสถานศึกษา/หัวข้อ/' + event['row']['id']);
  }
  filter(): void {
    let newData: any[] = this.standardList;
    newData = this.tdDataSevice.filterData(newData, this.searchTerm, true);
    newData = this.tdDataSevice.sortData(newData, this.sortBy, this.sortOrder);
    // newData = this.tdDataSevice.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.standardList = newData;
  }

}
