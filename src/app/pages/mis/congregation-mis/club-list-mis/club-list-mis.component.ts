import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatDialog } from '@angular/material';
import { routerAnimation } from '../../../../utils/page.animation';

import { EqaService } from '../../../../service/eqa.service';
import { CongregationService } from '../../../../service/congregation/congregation.service';
import { LocationService } from '../../../../service/location/location.service';


@Component({
  selector: 'app-club-list-mis',
  templateUrl: './club-list-mis.component.html',
  styleUrls: ['./club-list-mis.component.scss'],
  animations: [routerAnimation]
})
export class ClubListMISComponent implements OnInit {

  clubList = [];
  eduYearText;
  eduSemesterText;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
  }

  requestClubList(year, semester) {
    this.cgt.getCongregationAll(window.localStorage.getItem('token'), year, semester).then((resReturn: Array<{}>) => {
      // this.clubList = resReturn['subject'];
      resReturn['subject'].forEach((club, i) => {

        try {
          this.eduYearText = year;
          this.eduSemesterText = semester;
          let teacher = JSON.parse(club['teacher']);
          let info = JSON.parse(club['info']);
          let student = JSON.parse(club['student']);
          let tempClub = {
            id: club['id'],
            sequence: (i + 1),
            subjectName: club['name'],
            teacher: teacher,
            studentLength: student.length,
            teachingStatus: club['teaching_status']
          };
          this.clubList.push(tempClub);
        } catch (error) {
          console.log(club);
        }

      });
    });
  }

  gotoClubInfo(id){
    this.router.navigateByUrl('/ClubManageManagementSystem/ClubInfo/' + id);
    // window.open('/ClubManageManagementSystem/ClubInfo/' + id);
  }

}
