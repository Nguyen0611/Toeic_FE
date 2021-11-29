import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserUpdateComponent} from './user-update/user-update.component';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../@core/services/users.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../shares/directives/confirm-dialog/confirm-dialog.component';
import {RolesService} from '../../@core/services/roles.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }


  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private userService: UsersService,
    private rolesService: RolesService,
    private dialogService: NbDialogService) {
  }

  isLoad: boolean;
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'common.table.item_number', prop: 'index', flexGrow: 0.3},
    // {name: 'common.table.item_username', prop: 'name', flexGrow: 1},
    {name: 'common.table.item_email', prop: 'mail', flexGrow: 1},
    {name: 'common.table.item_fullName', prop: 'fullName', flexGrow: 1},
    {name: 'common.table.item_tel', prop: 'phone', flexGrow: 0.7},
    {name: 'common.table.item_avatar', prop: 'pathUrl', flexGrow: 0.5},
    {name: 'common.table.item_dateOfBirth', prop: 'dateOfBirth', flexGrow: 1},
    {name: 'common.table.item_role', prop: 'rolesName', flexGrow: 1},
    {name: 'common.table.item_status', prop: 'status', flexGrow: 1},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 1}
  ];

  inputForm = new FormGroup({
    // name: new FormControl(null, []),
    fullName: new FormControl(null, []),
    mail: new FormControl(null, []),
    phone: new FormControl(null, []),
    dateOfBirth: new FormControl(null, []),
    status: new FormControl(null, []),
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  viewUsers(data) {
    let title;
    let isCheck;
    if (data == null) {
      title = this.translate.instant('sys-users.title_add');
      isCheck = 0;
    } else {
      title = this.translate.instant('sys-users.title_view');
      isCheck = 1;
    }
    this.dialogService.open(UserUpdateComponent, {
      context: {
        title: title,
        data: data,
        isCheck: isCheck
      },
      dialogClass: 'modal-full',
    }).onClose.subscribe(
      value => {
        console.log(value);
        if (value) {
          if (data == null) {
            this.toastrService.success(this.translate.instant('sys-users.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('sys-users.content_edit_success'),
              this.translate.instant('common.title_notification'));
          }
          this.search(0);
        }
      }
    );
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.count;
    this.page.offset = page || 0;
    this.rows = data.list || [];
  }

  public search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    this.userService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      // name: this.inputForm.get("name").value,
      fullName: this.inputForm.get("fullName").value,
      mail: this.inputForm.get("mail").value,
      phone: this.inputForm.get("phone").value,
      dateOfBirth: this.inputForm.get("dateOfBirth").value,
      status: this.inputForm.get("status").value,
    }).subscribe(
      (res) => {
        this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        this.isLoad = false;
      },
      () => this.isLoad = false,
    );
  }

  deleteUsers(data) {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('common.title_notification'),
        message: this.translate.instant('sys-users.title_delete') + ' ' + data.mail
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.userService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('sys-users.delete_success'),
            this.translate.instant('common.title_notification'));
          this.search(0);
          this.isLoad = false;
        }, (err) => {
          this.toastrService.success(err.message),
            this.translate.instant('common.title_notification');
          this.isLoad = false;
        });
      }
    });
  }
}
