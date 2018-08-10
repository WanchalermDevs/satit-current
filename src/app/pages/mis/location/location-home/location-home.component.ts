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
import { LocationService } from '../../../../service/location/location.service';

@Component({
  selector: 'app-location-home',
  templateUrl: './location-home.component.html',
  styleUrls: ['./location-home.component.scss']
})

export class LocationHomeComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private router: Router, private locationService: LocationService) { }

  buildingList = [];
  placeList = [];

  ngOnInit() {
    this.locationService.getAllBuilding(window.localStorage.getItem('token')).then((resReturn) => {
      console.log(resReturn);
      let building = JSON.parse(resReturn['building']);

      building.forEach(item => {
        let tempBuilding = {
          buildingId: item['id'],
          Text: JSON.parse(item['info']).name,
          roomList: []
        };
        if (item['type'] === "building") {
          this.buildingList.push(tempBuilding);
        }else if (item['type'] === "place") {
          this.placeList.push(tempBuilding);
        }
      });

      building.forEach((item) => {
        if (item['type'] === "room") {
          // console.log(item);
          let roomInfo = JSON.parse(item['info']);
          this.buildingList.forEach(bb => {
            if (bb['buildingId'] == roomInfo['buildingID']) {
              bb['roomList'].push(JSON.parse(item['info']));
            }
          });
        }else if (item['type'] === "subPlace") {
          let roomInfo = JSON.parse(item['info']);
          this.placeList.forEach(bb => {
            console.log(bb);
            if (bb['buildingId'] == roomInfo['placeID']) {
              bb['roomList'].push(JSON.parse(item['info']));
            }
          });
        }
      });
    });
  }

  createBuilding() {
    this.router.navigateByUrl('/สถานที่/สร้างข้อมูลอาคารและสถานที่/' + 'building');
  }

  createRoom() {
    this.router.navigateByUrl('/สถานที่/สร้างข้อมูลอาคารและสถานที่/' + 'room');
  }

  createPlace() {
    this.router.navigateByUrl('/สถานที่/สร้างข้อมูลอาคารและสถานที่/' + 'place');
  }

  createSubPlace() {
    this.router.navigateByUrl('/สถานที่/สร้างข้อมูลอาคารและสถานที่/' + 'subPlace');
  }

  showListBuilding() {

  }

  showListPlace() {

  }
}
