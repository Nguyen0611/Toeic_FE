import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Track} from "ngx-audio-player";
import {SafeUrl} from "@angular/platform-browser";
import {QuestionsService} from "../../../@core/services/questions.service";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./details.component.scss'],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  msaapDisplayTitle = false;
  msaapDisplayPlayList = true;
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisablePositionSlider = true;
  lsView;
  lsQ;
  url: SafeUrl = '';

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: null,
      link: null,
      artist: null,
    }
  ];

  constructor(private topicService: TopicService, private router: Router,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
  ) {
  }

  lisTopic;
  loading = false;
  key;


  isSelect;
  isSize;
  value;
  isShowImg;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      // this.key.slice(10)))).split('/')
      const value = decodeURIComponent(escape(window.atob(this.key.slice(10)))).split('/');
      if (value[0] === '-1') {
      } else if (value[0] === '7') {
        this.isShowImg = false;
      } else if (value[0] === '8') {
        this.isShowImg = true;
      }
      this.value = value[1];
      console.log(value);
      this.search();
    });
  }

  search() {
    this.loading = true;
    this.questionsService.getQuestionsClient({
      categoryId: this.value,
    }).subscribe(
      (res) => {
        this.lisTopic = res.body;
        console.log(this.lisTopic)
        this.isSize = this.lisTopic?.length;
        for (let i = 0; i < this.lisTopic[0].fileUploadDTOs?.length; i++) {
          if (this.lisTopic[0].fileUploadDTOs[i].typeFile == 1) {
            this.url = this.lisTopic[0].fileUploadDTOs[i].path;
          } else {
            this.msaapPlaylist[0].link = this.lisTopic[0].fileUploadDTOs[i].path;
            console.log(this.msaapPlaylist)
          }
        }
        for (let i = 0; i < this.lisTopic?.length; i++) {
          if (i === 0) {
            this.isSelect = 1;
            this.lisTopic[i].isView = 1;
            this.lsView = this.lisTopic[i].listStringAnswers;
          } else {
            this.lisTopic[i].isView = 0;
          }
        }
      },
      (error) => {
        this.loading = false;
      },
      () => this.loading = false,
    );
  }

  isNext() {
    if (this.isSelect === this.lisTopic?.length) {
      this.isContainer = true;
      return;
    }
    this.isDisabled = false;
    this.isHide = true;
    this.lsView = this.lisTopic[this.isSelect].listStringAnswers;
    for (let i = 0; i < this.lisTopic[this.isSelect].fileUploadDTOs?.length; i++) {
      if (this.lisTopic[this.isSelect].fileUploadDTOs[i].typeFile == 1) {
        this.url = this.lisTopic[this.isSelect].fileUploadDTOs[i].path;
      } else {
        this.msaapPlaylist[0].link = this.lisTopic[this.isSelect].fileUploadDTOs[i].path;
        console.log(this.msaapPlaylist)
      }
    }
    this.isSelect++;
  }

  isHide = true;
  isContainer = false;
  isDisabled = false;
  isColor = 'primary';
  thisValue;
  rs = [];

  transscript = [];
  isCheck(x) {
    this.loading = true;
    this.thisValue = x;
    this.questionsService.isCheckQuestionsClient({
      categoryId: this.thisValue.categoryId,
      value: this.thisValue.value,
    }).subscribe(
      (res) => {
        this.lsView = res.body;
        let jstransscript = ''
        for (let i = 0; i < this.lsView?.length; i++) {
          const rs1 = {
            categoryName: null,
            kq: null,
          }
          jstransscript = this.lsView[i].transscript
          rs1.categoryName = this.lsView[i].categoryName;
          if (this.lsView[i].value === this.thisValue.value) {
            if (this.lsView[i].color === 'danger') {
              rs1.kq = 'Incorrect'
            } else if (this.lsView[i].color === 'success') {
              rs1.kq = 'Correct'
            }
            this.rs.push(rs1);
            break;
          }
        }
        if (res.body.answer === 1) {
          x.color = 'danger';
        } else if (res.body.answer === 0) {
          // dap an dung
          x.color = 'success';
        }
        const words = jstransscript.split('\n');
        this.transscript = words;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.isHide = false;
        this.isDisabled = true;
      },
    );
  }

  reload() {
    this.isContainer = false;
    this.isDisabled = false;
    this.isHide = true;
    this.rs = [];
    this.search();
  }
}
