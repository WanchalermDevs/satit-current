import { Component, OnInit, HostBinding } from '@angular/core';
import { EqaService } from '../../../../service/eqa.service';
import { ITdDataTableColumn } from '../../../../../../node_modules/@covalent/core/data-table';
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
    { name: 'sequnce', label: 'ประเมินคุณภาพการศึกษา' },

  ];

  constructor(private eqa: EqaService, private tdDataSevice: TdDataTableService) {

  }

  ngOnInit() {
    this.eqa.standardListByYear(window.localStorage.getItem('token'), '2560').then(data => {
      let list = JSON.parse(data['list']);
      // console.log(list);
      list.forEach(element => {
        let temp = {
          'sequnce': element['text'],
          'evaluation2560': '',
          'evaluation2561': ''
        }
        if (element['parent_id'] === -1) {
          this.standardList.push(temp);
        }
        this.filter();
      });
    })

  }
  selectedStandardItem(event) {

  }
  rowClick(event) {

  }
  filter(): void {
    let newData: any[] = this.standardList;
    newData = this.tdDataSevice.filterData(newData, this.searchTerm, true);
    newData = this.tdDataSevice.sortData(newData, this.sortBy, this.sortOrder);
    // newData = this.tdDataSevice.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.standardList = newData;
  }

}
