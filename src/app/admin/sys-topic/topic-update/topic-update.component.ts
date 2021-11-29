import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesService} from '../../../@core/services/roles.service';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {TopicService} from "../../../@core/services/topic.service";
import {ObjectsService} from "../../../@core/services/objects.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user-update',
  styleUrls: ['./topic-update.component.scss'],
  templateUrl: './topic-update.component.html',
})
export class TopicUpdateComponent implements OnInit {
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
    private objectsService: ObjectsService,
    public ref: NbDialogRef<TopicUpdateComponent>,
    private rolesService: RolesService,
    private sanitizer: DomSanitizer,
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private topicService: TopicService) {
  }

  listTopic: any;
  listPart: any;

  ngOnInit(): void {
    console.log(this.data);

    this.inputUser = new FormGroup({
      code: new FormControl(null, []),
      name: new FormControl(this.data?.name, [Validators.required]),
      idType: new FormControl(this.data?.idType, [Validators.required]),
      nameType: new FormControl(null, []),
      idPartTopic: new FormControl(this.data?.idPartTopic, [Validators.required]),
      namePartTopic: new FormControl(this.data?.namePartTopic, []),
      creationTime: new FormControl(null, []),
      updateTime: new FormControl(null, []),
    });
    this.getTopic(0)
    console.log(this.data?.idType)
    if (this.data?.idType !== null) {
      this.getTopic(this.data?.idType)
      // this.inputUser.get('namePartTopidPartTopicic').setValue(this.data?.idType);
    }
  };


  public getTopic(id) {
    this.loading = true;
    this.objectsService.queryTopic(id
    ).subscribe(
      (res) => {
        if (id === 0) {
          this.listTopic = res.body;
        } else {
          this.listPart = res.body
        }
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
  };

  channeTyoe() {
    console.log(this.inputUser.get('idType').value);
    if (this.inputUser.get('idType').value !== null) {
      if (this.inputUser.get('idPartTopic').value !== null) {
        this.inputUser.get('idPartTopic').setValue(null);
        this.listPart = null;
      }
      this.getTopic(this.inputUser.get('idType').value);
    } else {
      this.listPart = null;
    }
  }

  changeValue() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  submit() {
    console.log("as");
    this.inputUser.markAllAsTouched();
    if (this.inputUser.valid) {
      this.loading = true;
      const data = Object.assign({}, this.inputUser.value);
      data.id = this.data?.id;
      console.log(data);

      if (this.data == null) {
        this.topicService.insert(data).subscribe(
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
        this.topicService.update(data).subscribe(
          (value) => {
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

  cancel() {
    this.ref.close();
  }
}
