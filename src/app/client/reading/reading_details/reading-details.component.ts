import {Component, OnDestroy, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {TopicService} from "../../../@core/services/topic.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {QuestionsService} from "../../../@core/services/questions.service";


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./reading-details.component.scss'],
  templateUrl: './reading-details.component.html',
})
export class ReadingDetailsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
  }


  constructor(private topicService: TopicService,
              private activatedRoute: ActivatedRoute,
              private questionsService: QuestionsService,
              private router: Router,
  ) {
  }

  lisTopic;
  loading = false;
  key;
  listQuestion = [];
  dem = 0;
  questionCount = 0;
  randomCheck = [];
  ramdomValue;
  questionNumber;
  answerCheck: boolean;
  num;
  genQuestion = [];
  historyShow;
  totalQuestion;
  countClick = 1;
  disableButton= false;
  answerDefault: any[] = [{'choose': '(A)', 'index': 0, 'color': 'primary'},
                          {'choose': '(B)', 'index': 1, 'color': 'primary'},
                          {'choose': '(C)', 'index': 2, 'color': 'primary'},
                          {'choose': '(D)', 'index': 3, 'color': 'primary'}];
  answerDefaultCopy: any[];
  results: Array<{index: any, result: any}> = [];
  keyCopy;
  selectFile(event) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("params:", params)
      this.key = parseFloat(params['key']); // Click chọn chủ đề thì sẽ trả ra key
      this.num = 0;
      this.loading = true;
      this.questionsService.getQuestions({
        id: this.key, // key gọi a
        // Mảng để hứng các câu hỏi
      }).subscribe(
        (res) => {
          if (res.body.length <= 10) {
            this.questionCount = res.body.length
          } else this.questionCount = 10;
          // Hàm lấy random các câu hỏi thuộc chủ đề
          for (let i = 0; i < this.questionCount; i++) {
            this.ramdomValue = Math.floor(Math.random() * res.body.length);
            while (this.randomCheck.includes(this.ramdomValue)) {
              this.ramdomValue = Math.floor(Math.random() * res.body.length);
            }
            this.randomCheck.push(this.ramdomValue);
            this.listQuestion.push(res.body[this.ramdomValue]);
          }
          this.questionNumber = 0;
          this.genQuestion = this.listQuestion[this.questionNumber];
          this.totalQuestion = this.listQuestion.length;
          // this.results = Array[this.listQuestion.length];
          // console.log(this.genQuestion);
        },
        (error) => {
          console.log(error);
          this.loading = false;
        },
        () => this.loading = false,
      );
    });
    this.historyShow = true
    this.answerDefaultCopy = this.answerDefault;
  }
// Tăng câu hỏi lên 1, nếu câu hỏi < lengh question - last question thì sẽ hiển thin màn hình kết quả làm bài
  nextQuestion(): void {
    this.disableButton = false;
    if (this.questionNumber + 1 < this.listQuestion.length) {
      this.questionNumber += 1;
      this.genQuestion = null;
      this.genQuestion = this.listQuestion[this.questionNumber];
      this.countClick = 1;
    }else {
      this.historyShow = false;
      this.questionNumber = this.listQuestion.length
    }
    for (let i = 0; i < 4 ; i++) {
      this.answerDefaultCopy[i].color = 'primary';
    }
  }

  checkAnswer(your_answer: string, order_number: number) {
    this.disableButton = true;
    if (this.countClick === 1) {
      if (your_answer === '0') {
        this.answerDefaultCopy[order_number].color = 'success';
        this.results.push({index: this.questionNumber, result: 'Correct'});
      }else {
        this.answerDefaultCopy[order_number].color = 'danger';
        this.results.push({index: this.questionNumber, result: 'Incorrect'});
        for (let i = 0; i < 4 ; i++) {
          if (this.genQuestion[i].answer === '0') {
            this.answerDefaultCopy[i].color = 'success'
          }
        }
      }
      this.countClick = 0;
    }
  }

  counter(i: number) {
    return new Array(i);
  }
  // Gọi hàm để làm lại câu hỏi - gọi lại API - random các câu hỏi lần nữa
  similarExercise() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
}

