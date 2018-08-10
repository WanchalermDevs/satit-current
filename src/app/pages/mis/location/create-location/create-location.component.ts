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
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  typeAction: any;
  buildingName: any;
  placeName: any;
  errorMessage: any;
  showErrorMessage = false;
  buildingLevel: any;
  roomName: any;
  subPlaceName: any;

  buildingSelected: any;
  placeSelected: any;

  buildingList = [];
  placeList = [];

  isCreateBuilding = false;
  isCreateRoom = false;
  isCreatePlace = false;
  isCreateSubPlace = false;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private locationService: LocationService) {

  }

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      let tempTypeAction = param.method;
      if (tempTypeAction === "building") {
        this.typeAction = "อาคาร";

        this.isCreateBuilding = true;
        this.isCreateRoom = false;
        this.isCreatePlace = false;
        this.isCreateSubPlace = false;
      } else if (tempTypeAction === "room") {
        this.typeAction = "ห้อง";

        this.isCreateBuilding = false;
        this.isCreateRoom = true;
        this.isCreatePlace = false;
        this.isCreateSubPlace = false;

        this.setFormCreateRoom();
      } else if (tempTypeAction === "place") {
        this.typeAction = "สถานที่";

        this.isCreateBuilding = false;
        this.isCreateRoom = false;
        this.isCreatePlace = true;
        this.isCreateSubPlace = false;

      } else if (tempTypeAction === "subPlace") {

        this.isCreateBuilding = false;
        this.isCreateRoom = false;
        this.isCreatePlace = false;
        this.isCreateSubPlace = true;

        this.setFormCreateSubPlace();

        this.typeAction = "สถานที่ย่อย";
      }
    });
  }

  selectedBuildingEvent() {
    console.log(this.buildingSelected);
  }

  selectedPlaceEvent() {
    console.log(this.placeSelected);
  }

  saveRoom() {
    const param = {
      id: this.buildingSelected,
      level: this.buildingLevel,
      name: this.roomName
    };
    this.locationService.createRoom(window.localStorage.getItem('token'), param).then((resReturn) => {
      if (resReturn['operation'] === "success") {
        this.router.navigateByUrl('/สถานที่/หน้าแรก');
      }
    });
  }

  saveSubPlace() {
    const param = {
      id: this.placeSelected,
      name: this.subPlaceName
    };
    this.locationService.createSubPlace(window.localStorage.getItem('token'), param).then((resReturn) => {
      if (resReturn['operation'] === "success") {
        this.router.navigateByUrl('/สถานที่/หน้าแรก');
      }
    });
  }

  private setFormCreateRoom() {
    this.locationService.getAllBuilding(window.localStorage.getItem('token')).then((resReturn) => {
      if (resReturn['operation'] === "success") {
        let tempList = JSON.parse(resReturn['building']);
        tempList.forEach((building) => {
          
          if (building['type'] === "building") {
            let tempBuilding = {
              id: building['id'],
              text: JSON.parse(building['info']).name
            };
            this.buildingList.push(tempBuilding);
          }else if(building['type'] === "place"){
            let tempBuilding = {
              id: building['id'],
              text: JSON.parse(building['info']).name
            };
            this.placeList.push(tempBuilding);
          }
        });
      } else {
        console.log('ไม่สามารถเรียกดูรายการอาคารได้');
      }
      // this.buildingList = JSON.parse(resReturn['building'])[0];
      // console.log(this.buildingList);
    });
  }

  setFormCreateSubPlace() {
    this.setFormCreateRoom();
  }

  saveBuilding() {
    this.locationService.createBuilding(window.localStorage.getItem('token'), this.buildingName).then((resReturn) => {
      if (resReturn['operation'] === "success") {
        this.router.navigateByUrl('/สถานที่/หน้าแรก');
      } else {
        this.errorMessage = "การบันทึกผิดพลาด";
        this.showErrorMessage = true;
      }
    });
  }

  savePlace() {
    this.locationService.createPlace(window.localStorage.getItem('token'), this.placeName).then((resReturn) => {
      if (resReturn['operation'] === "success") {
        this.router.navigateByUrl('/สถานที่/หน้าแรก');
      } else {
        this.errorMessage = "การบันทึกผิดพลาด";
        this.showErrorMessage = true;
      }
    });
  }

  navigateBack() {
    this.router.navigateByUrl('/สถานที่/หน้าแรก');
  }

}
