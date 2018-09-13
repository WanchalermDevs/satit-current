import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Router, ActivatedRoute } from '@angular/router';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatDialog } from '@angular/material';
import { routerAnimation } from '../../../../utils/page.animation';

import { EqaService } from '../../../../service/eqa.service';
import { CongregationService } from '../../../../service/congregation/congregation.service';
import { LocationService } from '../../../../service/location/location.service';
import { StudentService } from '../../../../service/student/student.service';

@Component({
  selector: 'app-club-check-student-tps',
  templateUrl: './club-check-student-tps.component.html',
  styleUrls: ['./club-check-student-tps.component.scss']
})
export class ClubCheckStudentTpsComponent implements OnInit {

  eduSemesterText: any;
  eduYearText: any;
  timeStudy: any;
  building: any;
  room: any;
  currentClub = {
    id: '',
    subjectName: '',
    teacher: '',
    studentLength: '',
    teachingStatus: ''
  };
  studentList = [];
  attendanceList = [];

  wasSave = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService,
    private student: StudentService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      this.timeStudy = param.week;
      this.cgt.getAttendenceByTime(window.localStorage.getItem('token'), param.id, this.timeStudy).then(async attReturn => {
        this.attendanceList = attReturn['attendance'][0];
      });
      this.cgt.getClubInfoById(window.localStorage.getItem('token'), param.id).then(resReturn => {
        let club = resReturn['subject'][0];

        try {
          let teacher = JSON.parse(club['teacher']);
          let info = JSON.parse(club['info']);
          this.getBuilding(info['location']);
          let student = JSON.parse(club['student']);
          this.countStudent(student, info['edu_year']);
          this.eduYearText = info['edu_year'];
          this.eduSemesterText = info['edu_semester'];
          let tempClub = {
            id: club['id'],
            subjectName: club['name'],
            teacher: teacher,
            studentLength: student.length,
            teachingStatus: club['teaching_status']
          };
          this.currentClub = tempClub;
          // console.log(this.currentClub);
        } catch (error) {
          console.log(club);
          console.log(error);
        }
      });
    });
  }

  async setAttendance(att, stdCode) {
    if (att == undefined) {
      return false;
    } else {
      this.wasSave = true;
      let stdList = JSON.parse(att['att']);
      let value = false;
      stdList.forEach(element => {
        if (element['studentCode'] == stdCode) {
          if (element['value'] === true) {
            value = true;
          } else {
            value = false;
          }
        }
      });
      return value;
    }
  }

  saveAttendance() {
    let saveAtt = [];
    this.studentList.forEach(std => {
      let temp = {
        studentCode: std['studentCode'],
        value: std['attendance']
      }
      saveAtt.push(temp);
    });
    console.log(saveAtt);
    this.cgt.saveAttendance(window.localStorage.getItem('token'), this.eduYearText, this.currentClub['id'], this.timeStudy , saveAtt, this.wasSave).then(response => {
      console.log(response);
      console.log('/ระบบจัดการวิชาชุมนุมของครู/ข้อมูลวิชาชุมนุม/' + this.currentClub['id']);
      this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/ข้อมูลวิชาชุมนุม/' + this.currentClub['id']);
    });
  }

  showData() {
    // console.log(this.studentList);
  }

  async countStudent(student = [], eduYear) {
    student.forEach(std => {
      this.student.getAStudentInfo(window.localStorage.getItem('token'), std).then(async resStudent => {
        try {
          let tempStudent = resStudent['student'][0];
          let nudInfo = JSON.parse(tempStudent['nudinfo'])[0];
          let name = JSON.parse(tempStudent['name'])[0];
          let level;
          let room;
          let year;
          for (let i = 0; i < nudInfo['room'].length; i++) {
            if (nudInfo['room'][i]['edu_year'] == eduYear) {
              level = nudInfo['room'][i]['level'];
              room = nudInfo['room'][i]['room'];
              year = nudInfo['room'][i]['edu_year']
            }
          }
          let temp = {
            id: tempStudent['id'],
            studentCode: std,
            studentPreName: name['name_th']['prename'],
            studentFirstName: name['name_th']['firstname'],
            studentLastName: name['name_th']['lastname'],
            studentLevel: level,
            studentRoom: room,
            studentEduYear: year,
            attendance: await this.setAttendance(this.attendanceList, std)
          };
          this.studentList.push(temp);
        } catch (error) {
          console.log(error);
          console.log(std);
        }
      });
    });
  }

  getBuilding(id) {
    this.locationService.getLocationInfo(window.localStorage.getItem('token'), id).then(resLocation => {
      try {
        let location = JSON.parse(resLocation['building'])[0];
        let locationInfo = JSON.parse(location['info']);
        this.building = locationInfo['roomName'];
      } catch (error) {

      }
    });
  }

}
