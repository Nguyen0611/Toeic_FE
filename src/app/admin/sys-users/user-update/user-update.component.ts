import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesService} from '../../../@core/services/roles.service';
import {UsersService} from '../../../@core/services/users.service';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {getFormattedDate} from '../../../shares/utils/date-util';
import {validEmail} from "../../../validator";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user-update',
  styleUrls: ['./user-update.component.scss'],
  templateUrl: './user-update.component.html',
})
export class UserUpdateComponent implements OnInit {
  @Input() value: any;
  @Input() readonly: boolean;
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  listRole = null;
  lstRole1 = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  inputUser: any;
  itemRoles: any;
  loading = false;
  title: string;
  isCheck: number;
  data: any;
  mask;
  isDis = null;
  url: SafeUrl = '';
  selectedFiles: FileList;


  constructor(
    private toastr1: ToastrService,
    public ref: NbDialogRef<UserUpdateComponent>,
    private rolesService: RolesService,
    private sanitizer: DomSanitizer,
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.inputUser = new FormGroup({
      // name: new FormControl(this.data?.name, [Validators.required]),
      fullName: new FormControl(this.data?.fullName, [Validators.required]),
      phone: new FormControl(this.data?.phone, [Validators.pattern(/^\d{10}$/)]),
      mail: new FormControl(this.data?.mail, [Validators.required, validEmail]),
      pathUrl: new FormControl(this.data?.pathUrl, []),
      rolesId: new FormControl(this.data?.rolesId, []),
      dateOfBirth: new FormControl(null, []),
      status: new FormControl(this.data?.status, [Validators.required]),
    });
    this.url = this.inputUser.get('pathUrl').value;
    if (this.isCheck === 0) {
      this.isDis = null;
    } else {
      this.isDis = true;
      this.inputUser.patchValue(this.data);
      this.rolesService.query().subscribe(res => {
        this.lstRole1 = res.body.data.list;
      }, err => {
      });
    }
    this.inputUser.get('dateOfBirth').setValue(new Date(this.data?.dateOfBirth.toString()));
  };

  randomPass(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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
      data.id = this.data?.id;
      data.dateOfBirth = getFormattedDate(this.inputUser.get('dateOfBirth').value);
      console.log(data);

      if (this.data == null) {
        this.userService.insert(data, this.selectedFiles?.item(0)).subscribe(
          (value) => {
            this.ref.close(value);
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
            this.ref.close(value);
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

  cancel() {
    this.ref.close();
  }
}
