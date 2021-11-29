import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ToastrService} from "../../@core/mock/toastr-service";
import {RolesService} from "../../@core/services/roles.service";
import {UsersService} from "../../@core/services/users.service";
import {getFormattedDate} from "../../shares/utils/date-util";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user-update',
  styleUrls: ['./infor-users.component.scss'],
  templateUrl: './infor-users.component.html',
})
export class InforUsersComponent implements OnInit {
  // @Input() value: any;
  // @Input() readonly: boolean;
  // @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  listRole = null;
  lstRole1 = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  inputUser: any; // Nhập gì cũng đc
  itemRoles: any;
  loading = false;
  title: string;
  isCheck: number;
  data: any;
  mask;
  isDis = null;
  url: SafeUrl = '';
  selectedFiles: FileList;
  user: any;

  constructor(
    private toastr1: ToastrService,
    private rolesService: RolesService,
    private sanitizer: DomSanitizer,
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.data)
    this.inputUser = new FormGroup({
      // name: new FormControl(this.data?.name, [Validators.required]),
      fullName: new FormControl(this.data?.fullName, [Validators.required]),
      phone: new FormControl(this.data?.phone, [Validators.pattern(/^\d{10}$/)]),
      mail: new FormControl(this.data?.mail, [Validators.required]),
      pathUrl: new FormControl(this.data?.pathUrl, []),
      rolesId: new FormControl(this.data?.rolesId, []),
      dateOfBirth: new FormControl(null, []),
      status: new FormControl(this.data?.status, [Validators.required]),
    });
    this.url = this.inputUser.get('pathUrl').value;
    this.inputUser.get('dateOfBirth').setValue(new Date(this.data?.dateOfBirth));
  };


  changeValue() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  submit() {
    this.inputUser.markAllAsTouched();
    if (this.inputUser.valid) {
      this.loading = true;
      const data = Object.assign({}, this.inputUser.value);
      data.id = this.data?.id; //
      data.dateOfBirth = getFormattedDate(this.inputUser.get('dateOfBirth').value); // Format date
      console.log(data);

      if (this.data == null) {
        this.userService.insert(data, this.selectedFiles?.item(0)).subscribe(
          (value) => {
            this.toastr.success(this.translate.instant('sys-users.content_add_success'));
            // this.ref.close(value);
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );
      } else {
        this.userService.update(data, this.selectedFiles?.item(0)).subscribe(
          (value) => {
            const rs = value.body.data?.list;
            if (rs.isCheck === 1) {
              localStorage.setItem('userDetails', JSON.stringify(rs));
            }
            this.toastr.success(this.translate.instant('sys-users.content_edit_success'), this.translate.instant('common.title_notification'));
          },
          (error) => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false
        )
        ;
      }
    } else {
    }
  }


  selectFile(event) {
    if (event !== null) {
      this.selectedFiles = event.target.files;
      this.url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(event.target.files[0])
      );
    } else {
      this.selectedFiles = null;
    }
  }
}
