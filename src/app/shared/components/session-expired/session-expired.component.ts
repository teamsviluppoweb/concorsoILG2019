import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SessionExpiredComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

   ngOnInit(): void {
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
