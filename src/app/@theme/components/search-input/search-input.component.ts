import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'ngx-search-input',
  styleUrls: ['./search-input.component.scss'],
  template: `
    <i class="control-icon ion ion-ios-search"
       (click)="showInput()"></i>
    <input placeholder="Type your search request here..."
           #input
           [class.hidden]="!isInputShown"
           (blur)="hideInput()"
           (input)="onInput($event)">
  `,
})
export class SearchInputComponent {
  @ViewChild('input', { static: true }) input: ElementRef; // @ViewChild decorator :  truy cập vào các child component, directive hay DOM element từ parent component. Việc này thật dễ dàng khi đã có ViewChild decorator

  @Output() search: EventEmitter<string> = new EventEmitter<string>(); // sử dụng Output decorator để gắn property add như một sự kiện mà component có thể kích hoạt để gửi dữ liệu đến cha của nó.

  isInputShown = false;

  showInput() {
    this.isInputShown = true;
    this.input.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }

  onInput(val: string) {
    this.search.emit(val);
  }
}
