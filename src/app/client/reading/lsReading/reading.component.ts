import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {TranslateService} from "@ngx-translate/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }
  constructor(private topicService: TopicService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: NbToastrService,
              private translate: TranslateService,
              ) {
  }
  lisTopic;
  loading = false;
  key;
  test;
  nextPage(x) {
    if (x.isLength === 0) {
      this.toastrService.danger('Topic has not categories',
        this.translate.instant('common.title_notification'));
      return;
    }
    let url: string
    if (x.idPartTopic === 11) {
      url = '/readingdetails/' + x.id; // Gọi API theo id và trả ra list câu hỏi
    }else if (x.idPartTopic === 12) {
      url = '/readingdetails-part6/' + x.id + '_' + x.name;
    } else {
      url = 'home';
    }
    this.router.navigate([url]);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      console.log("reading")
      this.key = params['id'];
      this.topicService.lisTopic({ // List topic bên phía BE trả ra
        idPartTopic: this.key,
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
    });
  }

}
