import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eqa-home',
  templateUrl: './eqa-home.component.html',
  styleUrls: ['./eqa-home.component.scss']
})
export class EqaHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  standardManagementEnter() {
    // this.router.navigateByUrl('/EQA/StandardManagement');
    this.router.navigateByUrl('/EQA/standard-list');
  }

  roleManagement() {
    this.router.navigateByUrl('/EQA/RoleManagement');
  }

  gotoEvidenceList(){
    this.router.navigateByUrl('/EQA/รายการหลักฐาน');
  }

}
