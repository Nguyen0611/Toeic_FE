import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-confirm-dialog-client',
  templateUrl: './confirm-dialog-client.component.html',
  styleUrls: ['./confirm-dialog-client.component.scss']
})
export class ConfirmDialogClientComponent implements OnInit, AfterViewInit {
  @Input() title?: string = 'Thông báo'
  @Input() message: string
  @Input() okTitle?: string = 'Đồng ý'
  @Input() cancelTitle?: string = 'Huỷ';
  @Input() hideCancel?;
  @Input() hideCancel1?: boolean = true;

  constructor(protected ref: NbDialogRef<ConfirmDialogClientComponent>) {
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
  save1() {
    this.ref.close('confirm1');
  }
}
