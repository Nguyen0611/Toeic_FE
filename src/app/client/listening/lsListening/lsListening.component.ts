import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {TranslateService} from "@ngx-translate/core";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./lsListening.component.scss'],
  templateUrl: './lsListening.component.html',
})
export class LsListeningComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  constructor(private topicService: TopicService,
              private router: Router,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private activatedRoute: ActivatedRoute,
  ) {
  }

  lisTopic;
  loading = false;
  key;
  isLength;
  nextPage(x) {
    console.log(x);
    if (x.isLength === 0) {
      this.toastrService.danger('Topic has not categories',
        this.translate.instant('common.title_notification'));
      return;
    }
    let value1;
    if (this.key === undefined || this.key === '') {
      value1 = '-1' + x.id;
    } else {
      value1 = +this.key + '/' + x.id;
    }
    const url = this.makeid(10) + window.btoa(unescape(encodeURIComponent(value1)));
    this.router.navigate(['/details/' + url]);
  }
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['id'];
      this.topicService.lisTopic({
        idPartTopic: this.key,
      }).subscribe(
        (res) => {
          console.log(res);
          this.lisTopic = res.body.data.list;
          console.log(this.lisTopic);
          console.log(typeof (this.lisTopic));
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    });
  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}
