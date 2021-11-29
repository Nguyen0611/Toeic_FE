import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ToastrService} from '../../@core/mock/toastr-service';
import {FormControl, FormGroup} from '@angular/forms';
import {TopicUpdateComponent} from './topic-update/topic-update.component';
import {TranslateService} from '@ngx-translate/core';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../shares/directives/confirm-dialog/confirm-dialog.component';
import {TopicService} from "../../@core/services/topic.service";
import {ObjectsService} from "../../@core/services/objects.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-topic',
  styleUrls: ['./topic.component.scss'],
  templateUrl: './topic.component.html',
})
export class TopicComponent implements OnInit {
  ngOnInit(): void {
    this.search(0);
  }


  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private topicService: TopicService,
    private objectsService: ObjectsService,
    private dialogService: NbDialogService) {
    this.getTopic(0);
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
    {name: 'common.table.item_category_type', prop: 'nameType', flexGrow: 0.5},
    {name: 'common.table.item_category_part_topic', prop: 'namePartTopic', flexGrow: 0.7},
    {name: 'common.table.item_category_name', prop: 'name', flexGrow: 0.7},
    {name: 'common.table.item_impact_time', prop: 'stCreationTime', flexGrow: 0.5},
    {name: 'common.table.item_update_time', prop: 'stUpdateTime', flexGrow: 0.5},
    {name: 'common.table.item_action', prop: 'action_btn', flexGrow: 0.5}
  ];

  listTopic: any;
  listPart: any;
  inputForm = new FormGroup({
    code: new FormControl(null, []),
    name: new FormControl(null, []),
    idType: new FormControl(null, []),
    nameType: new FormControl(null, []),
    idPartTopic: new FormControl(null, []),
    namePartTopic: new FormControl(null, []),
    stCreationTime: new FormControl(null, []),
    stUpdateTime: new FormControl(null, []),
  });

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.search(pageInfo.offset);
  }

  viewUsers(data) {
    let title;
    let isCheck;
    if (data == null) {
      title = this.translate.instant('sys-topic.title_add');
      isCheck = 0;
    } else {
      title = this.translate.instant('sys-topic.title_view');
      isCheck = 1;
    }
    this.dialogService.open(TopicUpdateComponent, {
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
            this.toastrService.success(this.translate.instant('sys-topic.content_add_success'),
              this.translate.instant('common.title_notification'));
          } else {
            this.toastrService.success(this.translate.instant('sys-topic.content_edit_success'),
              this.translate.instant('common.title_notification'));
          }
          this.search(0);
        }
      }
    );
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    console.log(data)
    this.page.count = data.count;
    this.page.offset = page || 0;
    this.rows = data.list || [];
  }

  public getTopic(id) {
    this.isLoad = true;
    this.objectsService.queryTopic(id
    ).subscribe(
      (res) => {
        console.log(res);
        if ( id === 0) {
          this.listTopic = res.body;
        } else  {
          this.listPart = res.body
        }
        // this.onSuccess(res.body.data, res.headers, pageToLoad);
      },
      (error) => {
        this.isLoad = false;
      },
      () => this.isLoad = false,
    );
  }
  channeTyoe() {
    console.log(this.inputForm.get('idType').value);
    if (this.inputForm.get('idType').value !== null) {
      if (this.inputForm.get('idPartTopic').value !== null) {
        this.inputForm.get('idPartTopic').setValue(null);
        this.listPart = null;
      }
      this.getTopic(this.inputForm.get('idType').value);
    } else {
      this.listPart = null;
    }
  }
  public search(pageToLoad: number) {
    this.isLoad = true;
    this.page.offset = pageToLoad;
    this.topicService.doSearch({
      page: this.page.offset,
      page_size: this.page.limit,
      name: this.inputForm.get("name").value,
      idType: this.inputForm.get("idType").value,
      idPartTopic: this.inputForm.get("idPartTopic").value
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
        message: this.translate.instant('sys-topic.title_delete') + ' ' + data.name
      },
    }).onClose.subscribe(res => {
      if (res) {
        this.isLoad = true;
        this.topicService.delete(data.id).subscribe(() => {
          this.toastrService.success(this.translate.instant('sys-topic.delete_success'),
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
