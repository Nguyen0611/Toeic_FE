import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, AfterViewInit {
  @Input() title?: string = 'Thông báo'
  @Input() message: string
  @Input() okTitle?: string = 'OK'
  @Input() cancelTitle?: string = 'Cancel';
  @Input() hideCancel?;

  constructor(protected ref: NbDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const cancelBtn = document.getElementById('dialogCancelBtn');
    if (cancelBtn) {
      cancelBtn.focus();
    }
  }

  close() {
    this.ref.close()
  }

  save() {
    this.ref.close('confirm');
  }
}
