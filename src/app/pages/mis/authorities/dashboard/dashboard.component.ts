import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { routerAnimation } from '../../../../utils/page.animation';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/users/auth.service';
import { DialogMisEnter } from './dialog-mis-enter.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerAnimation]
})
export class DashboardComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  // Subscription to client width change
  gridColumns = 3;
  // Height of grid rows
  rowHeight = 360;

  misList: any;

  selectedOption: string;

  eqaAuthorityMessage: any;
  mobilizeAuthorityMessage: any;
  studentProjectAuthorityMessage: any;

  // @HostBinding('@routerAnimation') routerAnimation = true;
  user: any;
  img_user: any;
  user_full_name: any;
  personal_position: any;
  personal_party: any;
  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) {
    this.auth.getUserInfo(window.localStorage.getItem('token')).then((resReturn) => {
      this.user = resReturn;
      this.img_user = this.user.img_src;
      this.user_full_name = this.user.prename + this.user.firstname + "  " + this.user.lastname;
      this.personal_position = this.user.position;
      this.personal_party = this.user.party;
    });
  }

  ngOnInit() {
    this.onResize();
    // let user = JSON.parse(window.localStorage.getItem('user'));

    this.auth.getMISAuthority(window.localStorage.getItem('token')).then(resReturn => {
      this.misList = JSON.parse(resReturn['misList']);
      console.log(this.misList);
      this.eqaAuthority();
      this.mobilizeAuthority();
      this.studentProjectAuthority();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMisEnter);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  gotoCongregationHome() {
    this.router.navigateByUrl('/ระบบจัดการวิชาชุมนุมของครู/Home');
  }

  gotoLocation() {
    this.router.navigateByUrl('/สถานที่/หน้าแรก');
  }

  gotoFile() {
    this.router.navigateByUrl('/Files');
  }

  gotoEqaTpsHome(){
    this.router.navigateByUrl('/ระบบส่งหลักฐานประกันคุณภาพการศึกษา');
  }

  eqaEnter() {
    if (this.eqaAuthority()) {
      this.router.navigateByUrl('/EQA/Home');
    } else {
      this.openDialog();
    }
  }

  mobilizeEnter() {
    if (this.mobilizeAuthority()) {
      this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม/หน้าแรก');
    } else {
      this.openDialog();
      // this.router.navigateByUrl('/กิจกรรมพัฒนาผู้เรียน-ชุมนุม/หน้าแรก');
    }
  }

  studentProjectEnter() {
    if (this.studentProjectAuthority()) {

    } else {
      this.openDialog();
    }
  }

  eqaAuthority() {
    let check = false;
    this.eqaAuthorityMessage = "คุณไม่ได้รับสิทธิ์ให้เข้าใช้งานได้";
    this.misList.forEach(element => {
      if (element.name == "งานพัฒนาและประกันคุณภาพการศึกษา") {
        check = true;
        this.eqaAuthorityMessage = "คลิกเพื่อเข้าใช้งานระบบงานพัฒนาและประกันคุณภาพการศึกษา";
      }
    });
    return check;
  }

  mobilizeAuthority() {
    let check = false;
    this.mobilizeAuthorityMessage = "คุณไม่ได้รับสิทธิ์ให้เข้าใช้งานได้";
    this.misList.forEach(element => {
      if (element.name == "งานกิจกรรมพัฒนาผู้เรียน(ชุมนุม)") {
        check = true;
        this.mobilizeAuthorityMessage = "คลิกเพื่อเข้าใช้งานระบบงานงานกิจกรรมพัฒนาผู้เรียน(ชุมนุม)";
      }
    });
    return check;
  }

  studentProjectAuthority() {
    let check = false;
    this.studentProjectAuthorityMessage = "คุณไม่ได้รับสิทธิ์ให้เข้าใช้งานได้";
    this.misList.forEach(element => {
      if (element.name == "งานโครงงาน") {
        check = true;
        this.studentProjectAuthorityMessage = "คลิกเพื่อเข้าใช้งานระบบงานโครงงาน";
      }
    });
    return check;
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 1150) {
      this.gridColumns = 2;
    } else if (window.innerWidth < 1500) {
      this.gridColumns = 3;
    } else {
      this.gridColumns = 3;
    }
  }

}
