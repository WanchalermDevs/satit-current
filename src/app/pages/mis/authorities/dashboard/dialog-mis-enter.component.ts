import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-mis-enter',
  templateUrl: './dialog-mis-enter.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class DialogMisEnter implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMisEnter>) {}

  ngOnInit() {
  }

}
