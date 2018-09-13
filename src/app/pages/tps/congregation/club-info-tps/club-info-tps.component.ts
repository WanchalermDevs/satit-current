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
import { FileUploadService } from '../../../../service/files/file-upload.service';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';

const URL = 'http://www.satit.nu.ac.th/clubUpload';

@Component({
  selector: 'app-club-info-tps',
  templateUrl: './club-info-tps.component.html',
  styleUrls: ['./club-info-tps.component.scss']
})
export class ClubInfoTpsComponent implements OnInit {

  eduSemesterText: any;
  eduYearText: any;
  building: any;
  room: any;
  token = window.localStorage.getItem('token');
  currentClub = {
    id: '',
    subjectName: '',
    teacher: '',
    studentLength: '',
    teachingStatus: ''
  };
  studentList = [];
  photoList = [];

  standardList = [
    { text:'เห็นคุณค่าในตนเอง มีความมั่นใจ กล้าแสดงอย่างเหมาะสม', value: '1.4', check: false },
    { text:'สร้างผลงานจากการเข้าร่วมกิจกรรมด้านศิลปะดนตรี นาฎศิลป์ กีฬา นันทนาการ ตามจินตนาการ', value: '1.6', check: false },
    { text:'มีคุณลักษณะอันพึงประสงค์ตามหลักสูตร', value: '2.1', check: false },
    { text:'ตระหนักคุณค่า ร่วมอนุรักษ์และพัฒนาสิ่งแวดล้อม', value: '2.4', check: false },
    { text:'มีนิสัยรักการอ่านและแสวงหาความรู้ด้วยตนเองจากห้องสมุด แหล่งเรียนรู้และสื่อต่างๆรอบตัว', value: '3.1', check: false },
    { text:'มีทักษะในการอ่าน ฟัง ดู พูด เขียน และตั้งคำถามเพื่อค้นหาความรู้เพิ่มเติม', value: '3.2', check: false },
    { text:'เรียนรู้ร่วมกันเป็นกลุ่ม แลกเปลี่ยนความคิดเห็นเพื่อการเรียนรู้ระหว่างกัน', value: '3.3', check: false },
    { text:'มีความคิดริเริ่ม และสร้างสรรค์ผลงานด้วยความภาคภูมิใจ', value: '4.4', check: false },
    { text:'วางแผนการทำงานและดำเนินการจนเสร็จ', value: '6.1', check: false },
    { text:'ทำงานอย่างมีความสุข มุ่งมั่นพัฒนา และภูมิใจในผลงานของตนเอง', value: '6.2', check: false },
    { text:'ทำงานร่วมกับผู้อื่นได้', value: '6.3', check: false },
    { text:'มีความรู้สึกที่ดีต่ออาชีพสุจริต และหาความรู้เกี่ยวกับอาชีพที่ตนเองสนใจ', value: '6.4', check: false }
  ];

  public uploader: FileUploader = new FileUploader({ url: URL, autoUpload: true });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cgt: CongregationService,
    private locationService: LocationService,
    private student: StudentService, 
    private fileUpload: FileUploadService
  ) { }

  numberStudentM1 = 0;
  numberStudentM2 = 0;
  numberStudentM3 = 0;
  numberStudentM4 = 0;
  numberStudentM5 = 0;
  numberStudentM6 = 0;
  numberStudentTotal = 0;
  maxWeek = 0;
  minWeek = 0;
  weeks = [];
  attendanceList = [];
  isShowPrograssBar;
  bufferValue;
  prograssValue;
  showFileDescription: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(e);
  }

  onDrop() {
    console.log("onDrop");
  }

  onLoadStart() {
    console.log("On Load Start");
  }

  mouseClickDropPlace() {
    console.log('mouseClickDropPlace');
  }


  standardClick(){
    // console.log(this.standardList);
    let std = this.standardList;
    setTimeout(()=> {
      this.cgt.setSubjectStandard(window.localStorage.getItem('token'),this.currentClub['id'], std).then(standardResponse => {
        // console.log(standardResponse);
      });
    }, 250);
  }

  setNumberStudent(n) {
    if (n == 1) {
      this.numberStudentM1++;
    } else if (n == 2) {
      this.numberStudentM2++;
    } else if (n == 3) {
      this.numberStudentM3++;
    } else if (n == 4) {
      this.numberStudentM4++;
    } else if (n == 5) {
      this.numberStudentM5++;
    } else if (n == 6) {
      this.numberStudentM6++;
    }

    this.numberStudentTotal++;
  }

  async setAttendance(att, stdCode) {
    let tempAttendance = new Array(this.maxWeek);
    for (let i = 0; i < this.maxWeek; i++) {
      tempAttendance[i] = false;
      if (att.length == 0) {
        tempAttendance[i] = '';
      } else {
        att.forEach(element => {
          if ((element['time'] - 1) == i) {
            // tempAttendance[i] = '1';
            try {
              let studentSet = JSON.parse(element['att']);
              studentSet.forEach(ss => {
                if (ss['studentCode'] == stdCode) {
                  // console.log('Time:> ' + element['time'] + ' Student Code:> ' + stdCode + ':> ' + ss['value']);
                  tempAttendance[i] = ss['value'];
                }
              });
            } catch (error) {
              tempAttendance[i] = false;
            }
          }
        });
      }
    }
    // console.log(stdCode);
    // console.log(tempAttendance);
    return tempAttendance;
  }

  async studyResult(att) {
    // console.log(att);
    let count = 0;
    att.forEach(a => {
      if (a) count++;
    });
    if (count < this.minWeek) {
      return false;
    } else {
      return true;
    }
    // return count;
  }

  async countStudent(student = [], eduYear) {
    student.forEach(std => {
      this.student.getAStudentInfo(window.localStorage.getItem('token'), std).then(resStudent => {
        try {
          let tempStudent = resStudent['student'][0];
          let nudInfo = JSON.parse(tempStudent['nudinfo'])[0];
          let name = JSON.parse(tempStudent['name'])[0];
          let level;
          let room;
          let year;
          for (let i = 0; i < nudInfo['room'].length; i++) {
            if (nudInfo['room'][i]['edu_year'] == eduYear) {
              this.setNumberStudent(nudInfo['room'][i]['level']);
              level = nudInfo['room'][i]['level'];
              room = nudInfo['room'][i]['room'];
              year = nudInfo['room'][i]['edu_year']
            }
          }
          this.cgt.getAttendence(window.localStorage.getItem('token'), std, this.currentClub['id']).then(async attReturn => {
            // console.log(attReturn['attendance']);
            let attSet = await this.setAttendance(attReturn['attendance'], std);
            let attResult = await this.studyResult(attSet);
            let temp = {
              _sort: '' + level + room + std,
              id: tempStudent['id'],
              studentCode: std,
              studentPreName: name['name_th']['prename'],
              studentFirstName: name['name_th']['firstname'],
              studentLastName: name['name_th']['lastname'],
              studentLevel: level,
              studentRoom: room,
              studentEduYear: year,
              attendance: attSet,
              stdResult: attResult
            };
            this.studentList.push(temp);
            this.studentList.sort((a, b) => {
              return a['_sort'] - b['_sort'];
            });
          });

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
        // console.log(locationInfo);
        this.building = locationInfo['roomName'];
      } catch (error) {

      }
    });
  }

  checkStandardFormServer(id){
    this.cgt.getSubjectStandard(window.localStorage.getItem('token'), id).then(Response => {
      console.log(Response);
      try{
        this.standardList = JSON.parse(Response['results'][0]['standard']);
        console.log(this.standardList);
      }catch(error){

      }
      
    });
  }

  setPhotoFormServer(id){
    this.cgt.getClubPhoto(window.localStorage.getItem('token'), id).then(photoResp => {
      console.log(photoResp['photo']['file']);
      try{
        this.photoList = [];
        photoResp['photo'].forEach(photo => {
          let pTemp = JSON.parse(photo['file']);
          this.photoList.push(pTemp);
        });
        console.log(this.photoList);
      }catch(error){

      }
    });
  }

  ngOnInit() {
    this.showFileDescription = false;
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
      this.isShowPrograssBar = true;
      console.log(fileItem);
      console.log(progress);
      this.bufferValue = progress;
      this.prograssValue = progress;
      // this.currentID = id;
      if(progress === 100){
        this.showFileDescription = true;
        this.isShowPrograssBar = false;
      }else{
        this.showFileDescription = false;
      }
    };
    this.activeRoute.params.subscribe(param => {
      this.checkStandardFormServer(param.id);
      this.setPhotoFormServer(param.id);
      this.cgt.getClubInfoById(window.localStorage.getItem('token'), param.id).then(resReturn => {
        let club = resReturn['subject'][0];
        try {
          let teacher = JSON.parse(club['teacher']);
          let info = JSON.parse(club['info']);
          // console.log(info);
          this.getBuilding(info['location']);
          let student = JSON.parse(club['student']);
          this.countStudent(student, info['edu_year']);
          this.eduYearText = info['edu_year'];
          this.eduSemesterText = info['edu_semester'];
          this.maxWeek = club['max_week'];
          this.minWeek = Math.ceil(this.maxWeek * 0.8);
          for (let i = 1; i <= this.maxWeek; i++) {
            this.weeks.push(i);
          }
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

  getStudentListExcel(){
    this.cgt.initStudentListExcel(window.localStorage.getItem('token'), this.currentClub['id'], this.studentList, this.currentClub).then(response => {
      console.log(response);
      window.open('http://www.satit.nu.ac.th/node/congregation/fileClubMemberExcel/?token=' + this.token + '&table_id=' + response['results']['insertId'],'_bank');
    });
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(response);
    let data = JSON.parse(response);
    let fileResponse = JSON.parse(data['file']);
    console.log(fileResponse);
    this.isShowPrograssBar = false;
    if((fileResponse['mimetype'] == "image/jpeg") || (fileResponse['mimetype'] == "image/jpg") || (fileResponse['mimetype'] == "image/png")){
      this.cgt.insertFile(window.localStorage.getItem('token'),this.currentClub['id'], 'photo', fileResponse).then(resp => {
        console.log(resp);
        this.setPhotoFormServer(this.currentClub['id']);
      });
    }else{
      alert("ไม่สำเร็จ เนื่องจากไม่ใช่ชนิดไฟล์รูปภาพที่กำหนด");
    }
  }

}
