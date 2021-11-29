import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ToastrService} from '../../../@core/mock/toastr-service';
import {NbDialogRef, NbTabComponent, NbTabsetComponent, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RolesService} from '../../../@core/services/roles.service';
import {TranslateService} from '@ngx-translate/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ObjectsService} from "../../../@core/services/objects.service";
import {CategoriesService} from "../../../@core/services/categories.service";
import {TopicService} from "../../../@core/services/topic.service";
import {Track} from "ngx-audio-player";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-user-update',
  styleUrls: ['./category-update.component.scss'],
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
  templateUrl: './category-update.component.html',
})
export class CategoryUpdateComponent implements OnInit {
  @Input() value: any;
  @Input() readonly: boolean;
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

  @ViewChild("tabset") tabsetEl: NbTabsetComponent;
  @ViewChild("addTab") addTabEl: NbTabComponent;

  ActivateTabAdd() {
    console.log("asd");
    this.tabsetEl.selectTab(this.addTabEl);
  }

  @ViewChild('audioOption') audioPlayerRef: ElementRef;

  onAudioPlay() {
    this.audioPlayerRef.nativeElement.play();
  }

  @ViewChild('figAudio') figAudio: ElementRef; // audio tag reference
  audSrc = 'C:\\Users\\hieutt1\\Desktop\\ETS2016new-Test 01-Part1-01.mp3';

  audFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const audSrc = URL.createObjectURL(event.target.files[0]);
      this.figAudio.nativeElement.src = this.audSrc;
    }
  }

  listRole = null;
  lstRole1 = [];
  lisFile = [];
  listStatus = [
    {name: 'common.status.1', code: 1},
    {name: 'common.status.0', code: 0}
  ];

  listQue = [
    {stt: 1, name: '', transscript: '', answer: null, status: 1, listAnswers: [{stt: 1, value: ""}]},
  ];

  isShopValidateImg() {
    if (this.inputUser.get('idPartTopic').value === 7) {
      return true;
    }
  }

  validateListQue() {
    for (let i = 0; i < this.listQue?.length; i++) {
      if ((this.listQue[i].name === '' || this.listQue[i].name === null)) {
        if (this.inputUser.get('idPartTopic').value === 7) {
          if (this.url === undefined || this.url === '') {
            this.toastr.danger("Please upload image file ", this.translate.instant('common.title_notification'));
            return false;
          } else if (this.isAudio === false || this.isAudio === undefined) {
            this.toastr.danger("Please upload audio ", this.translate.instant('common.title_notification'));
            return false;
          }
        } else if (this.inputUser.get('idPartTopic').value === 8 ) {
          if (this.isAudio === false || this.isAudio === undefined) {
            this.toastr.danger("Please upload audio ", this.translate.instant('common.title_notification'));
            return false;
          }
        } else if (this.inputUser.get('idPartTopic').value === 12) {
          if (this.url === undefined || this.url === '') {
            this.toastr.danger("Please upload image  ", this.translate.instant('common.title_notification'));
            return false;
          }
        } else {
          this.toastr.danger("Vui long dien question cau file" + (i + 1), this.translate.instant('common.title_notification'));
          this.inputUser.get("listQue").setValue(null);
          return false;
        }
      }
      if (this.listQue[i].listAnswers === null || this.listQue[i].listAnswers?.length === 0) {
        this.toastr.danger("Question" + (i + 1) + "have at least one answers", this.translate.instant('common.title_notification'));
        this.inputUser.get("listQue").setValue(null);
        return false;
      } else {
        for (let j = 0; j < this.listQue[i].listAnswers.length; j++) {
          if (this.listQue[i].listAnswers[j].value === '' || this.listQue[i].listAnswers[j].value === null) {
            this.toastr.danger("Fill in the answer information completely " + (i + 1), this.translate.instant('common.title_notification'));
            this.inputUser.get("listQue").setValue(null);
            return false;
          }
        }
      }
      if (this.listQue[i].answer === null) {
        this.toastr.danger("Please choose a anwers " + (i + 1), this.translate.instant('common.title_notification'));
        return false;
      }
    }
    this.inputUser.get("listQue").setValue(this.listQue);
    console.log(this.inputUser);
    return true;
  }

  validateFile() {
    if (this.inputUser.get('idPartTopic').value === 7) {
      if (this.url === undefined || this.url === '') {
        console.log("loi r ")
      } else if (this.isAudio = true) {

      }
      this.isShowImg = true;
      this.isShowAudio = true;
    }
    if (this.inputUser.get('idPartTopic').value === 8) {
      this.isShowImg = false;
      this.isShowAudio = true;
    }
    if (this.inputUser.get('idPartTopic').value === 11) {
      this.isShowImg = false;
      this.isShowAudio = false;
    }
    if (this.inputUser.get('idPartTopic').value === 12) {
      this.isShowImg = true;
      this.isShowAudio = false;
    }
  }

  inputUser: any;
  inputUser1: any;
  itemRoles: any;
  loading = false;
  title: string;
  questionForm: FormGroup;
  isCheck: number;
  data: any;
  mask;
  isDis = null;
  url: SafeUrl = '';
  selectedFiles: FileList;
  constructor(
    private toastr1: ToastrService,
    private fb: FormBuilder,
    private objectsService: ObjectsService,
    public ref: NbDialogRef<CategoryUpdateComponent>,
    private rolesService: RolesService,
    private sanitizer: DomSanitizer,
    private sanitize: DomSanitizer,
    protected cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    private topicService: TopicService,
    private translate: TranslateService,
    private categoriesService: CategoriesService) {
  }

  listTopic: any;   // ds type of category
  listPart: any; // ds part
  lisTopic: any; // ds topic name
  playAudio() {
    const audio = new Audio();
    audio.src = "http://localhost:4201/toeic-web/assets/audio/category/Universitye4234333333/102021120920217457_ETS2016new-Test-01-Part1-01.mp3";
    audio.load();
    audio.play();
  }


  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisablePositionSlider = true;

  msaapPlaylist: Track[] = [
    {
      title: null,
      link: null,
      artist: null,
    }
  ];
  isShow: boolean;
  isShowQ: boolean;
  tabs = [{title: 'Tab1', active: false}, {title: 'Tab2', active: true}];
  setActiveSearch: boolean = false;
  setActiveAdd: boolean = false;

  isShowImg: boolean
  isShowAudio: boolean

  onEvento(e) {
    console.log(e.tabTitle)
  }

  isShowTab: boolean;
  isShowTabQuestion: boolean;

  ngOnInit(): void {
    this.isShowTab = false;
    this.isShowTabQuestion = false;
    this.isShowQ = false;

    if (this.data?.idPartTopic === 7 || this.data?.idPartTopic === 8) {
      this.isAudio = true;
      this.isShowQ = true;
      this.isShow = true;

    } else {
      this.isShowQ = false;
      this.isShow = false;

    }
    if (this.data?.idPartTopic === 7 || this.data?.idPartTopic === 8 || this.data?.idPartTopic === 12) {
      this.isShowTab = true;
    } else {
      this.isShowTab = false;
    }
    if (this.data?.idPartTopic === 7 || this.data?.idPartTopic === 8 || this.data?.idPartTopic === 11 || this.data?.idPartTopic === 12) {
      this.isShowTabQuestion = true;
    } else {
      this.isShowTabQuestion = false;
    }
    if (this.data?.idPartTopic === 11) {
      this.isShowTab = false;
    }

    if (this.data?.idPartTopic === 7) {
      this.isShowImg = true;
      this.isShowAudio = true;
    }
    if (this.data?.idPartTopic === 8) {
      this.isShowImg = false;
      this.isShowAudio = true;
    }

    if (this.data?.idPartTopic === 11) {
      this.isShowImg = false;
      this.isShowAudio = false;
    }

    if (this.data?.idPartTopic === 12) {
      this.isShowImg = true;
      this.isShowAudio = false;
    }


    console.log(this.isShowImg);
    console.log(this.isShowAudio);
    this.loading = true;
    this.inputUser = new FormGroup({
      code: new FormControl(this.data?.code, []),
      name: new FormControl(this.data?.name, []),
      categoryName: new FormControl(this.data?.categoryName, [Validators.required, Validators.maxLength(100)]),
      idType: new FormControl(null, [Validators.required]),
      nameType: new FormControl(null, []),
      idPartTopic: new FormControl(null, [Validators.required]),
      topicId: new FormControl(null, [Validators.required]),
      oldCategoryName: new FormControl(this.data?.categoryName, []),
      listQue: new FormControl(null, []),
      namePartTopic: new FormControl(this.data?.namePartTopic, []),
      status: new FormControl(this.data?.status === undefined ? 1 : this.data?.status, []),
    });
    if (this.isCheck === 0) {
      this.inputUser.get("status").disable();
      this.inputUser.get("idType").disable();
      this.inputUser.get("idPartTopic").disable();
      this.inputUser.get("topicId").disable();
      this.isDis = true;
      this.isShow = true;
    }
    if (this.data === null || this.data === undefined) {
      this.getTopic(0)
      console.log(this.data?.idType)
      if (this.data?.idType !== null) {
        this.getTopic(this.data?.idType)
      }
    } else {
      this.categoriesService.doSearchDetail({
        idType: this.data?.idType,
        idPartTopic: this.data?.idPartTopic,
        id: this.data?.id
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisFile = [];
          this.listTopic = res.body.data.list.listTopic;
          this.listPart = res.body.data.list.listPart;
          this.lisTopic = res.body.data.list.lisTopic;
          this.listQue = res.body.data.list.listQue;
          this.lisFile = res.body.data.list.lisFile;
          for (let i = 0; i < this.lisFile?.length; i++) {
            console.log(this.lisFile[i]);
            if (this.lisFile[i].typeFile === '1') {
              this.url = this.lisFile[i].path;
            } else if (this.lisFile[i].typeFile === '0') {
              this.msaapPlaylist[0].link = this.lisFile[i].path;
              console.log(this.msaapPlaylist)
            }
          }
          this.inputUser.get("idType").setValue(this.data?.idType);
          this.inputUser.get("idPartTopic").setValue(this.data?.idPartTopic);
          this.inputUser.get("topicId").setValue(this.data?.topicId);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    }
  };

  fields: any;

  isAudio: boolean;
  // xu ly file
  selectFile(event) {
    if (event !== null) {
      this.selectedFiles = event.target.files;
      console.log(this.selectedFiles);
      this.isAudio = false;
      for (let i = 0; i < this.selectedFiles?.length; i++) {
        const value = this.selectedFiles[i].name.split('.').pop();
        if (value === 'mp3') {
          this.isAudio = true;
          // chua xu ly
          // this.inputUser.get("isValidate").setErrors(null);
        } else if (value === 'png' || value === 'jpg' || value === 'jpeg' || value === 'jpeg') {
          this.url = this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(this.selectedFiles[i])
          );
        }
      }
    } else {
      this.selectedFiles = null;
    }
  }


  addQue(type: any, obj: any) {
    if (type === 0) {
      this.listQue.push({
          stt: this.listQue.length + 1,
          name: '',
          answer: null,
          status: 1,
          transscript: '',
          listAnswers: []
        }
      )
      for (let i = 0; i < this.listQue.length; i++) {
        this.listQue[i].stt = (i + 1);
      }
      this.listQue[(this.listQue.length - 1)].listAnswers.push({stt: 1, value: ''})
    } else if (type === 1) {
      if (this.listQue[obj].listAnswers.length < 4) {
        this.listQue[obj].listAnswers.push({
            stt: 1, value: ""
          }
        )
        for (let i = 0; i < this.listQue[obj].listAnswers.length; i++) {
          this.listQue[obj].listAnswers[i].stt = (i + 1);
        }
      } else {
        this.toastr.danger("Maximum 4 answer options", this.translate.instant('common.title_notification'));
      }

    }

  }

  remoteQue(type: any, obj: any, idRemote: any) {
    if (type === 0) {
      if (this.listQue.length <= 1) {
        this.toastr.danger("1 categories has at least 1 question", this.translate.instant('common.title_notification'));
        return;
      }
      const index = this.listQue.findIndex(x => x.stt === obj);
      if (index > -1) {
        this.listQue.splice(index, 1);
        for (let i = 0; i < this.listQue.length; i++) {
          this.listQue[i].stt = (i + 1);
        }
      }
    } else if (type === 1) {
      if (idRemote === -1) {
        return;
      }
      if (this.listQue[obj].listAnswers.length <= 1) {
        this.toastr.danger("1 question has at least 1 answer option", this.translate.instant('common.title_notification'));
        return;
      }
      console.log(this.listQue[obj].listAnswers);
      const index = this.listQue[obj].listAnswers.findIndex(x => x.stt == idRemote);
      if (index > -1) {
        this.listQue[obj].listAnswers.splice(index, 1);
        for (let i = 0; i < this.listQue[obj].listAnswers.length; i++) {
          this.listQue[obj].listAnswers[i].stt = (i + 1);
        }
      }
    }

  }

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

  getLisTopic() {
    this.isShowTab = false;
    this.isShowTabQuestion = true;
    this.isShowQ = false;
    if (this.inputUser.get('idType').value !== null && this.inputUser.get('idPartTopic').value !== null) {
      // goi api lay ds topic name
      if (this.inputUser.get('idPartTopic').value === 7 || this.inputUser.get('idPartTopic').value === 8) {
        this.isShowQ = true;
        this.isShow = true;
      } else {
        this.isShowQ = false;
        this.isShow = false;
      }
      if (this.inputUser.get('idPartTopic').value === 11) {
        this.isShowTab = false;
      } else {
        this.isShowTab = true;
      }

      if (this.inputUser.get('idPartTopic').value === 7) {
        this.isShowImg = true;
        this.isShowAudio = true;
      }
      if (this.inputUser.get('idPartTopic').value === 8) {
        this.isShowImg = false;
        this.isShowAudio = true;
      }
      if (this.inputUser.get('idPartTopic').value === 11) {
        this.isShowImg = false;
        this.isShowAudio = false;
      }
      if (this.inputUser.get('idPartTopic').value === 12) {
        this.isShowImg = true;
        this.isShowAudio = false;
      }
      this.loading = true;
      this.inputUser.get('topicId').setValue(null);
      this.lisTopic = null;
      this.topicService.lisTopic({
        idType: this.inputUser.get("idType").value,
        idPartTopic: this.inputUser.get("idPartTopic").value
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisTopic = res.body.data.list;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    } else {
      this.lisTopic = null;
      this.isShowTabQuestion = false;
    }
  }

  channeTyoe() {
    console.log(this.inputUser.get('idType').value);
    if (this.inputUser.get('idType').value !== null) {
      if (this.inputUser.get('idPartTopic').value !== null) {
        this.inputUser.get('idPartTopic').setValue(null);
        this.listPart = null;
        this.isShowTabQuestion = false;
        this.isShowTab = false;
      }
      this.getTopic(this.inputUser.get('idType').value);
    } else {
      this.listPart = null;
      this.lisTopic = null;
    }
  }

  changeValue() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  submit() {
    this.inputUser.markAllAsTouched();
    if (this.inputUser.valid && this.validateListQue() === true) {
      this.loading = true;
      const data = Object.assign({}, this.inputUser.value);
      data.id = this.data?.id;
      if (this.data == null) {
        this.categoriesService.insert(data, this.selectedFiles).subscribe(
          (value) => {
            this.loading = false;
            this.ref.close(value);
          },
          error => {
            this.toastr.danger(error.error.message, this.translate.instant('common.title_notification'));
            this.loading = false;
          },
          () => this.loading = false,
        );
      } else {
        this.categoriesService.update(data,  this.selectedFiles).subscribe(
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
