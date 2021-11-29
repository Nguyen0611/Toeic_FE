import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  NbAdjustment,
  NbCalendarViewMode,
  NbOverlayRef,
  NbOverlayService,
  NbPosition,
  NbPositionBuilderService,
  NbTemplatePortal
} from '@nebular/theme';
import * as moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngx-hero-picker',
  templateUrl: './hero-picker.component.html',
  styleUrls: ['./hero-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HeroPickerComponent),
      multi: true
    }
  ]
})
export class HeroPickerComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() timeType: 'date' | 'month' | 'quarter' | 'year' = 'month';
  @Output() enter: EventEmitter<any> = new EventEmitter();
  @Input() value: any;
  @Input() size: any = 'medium';
  @Input() readonly: boolean;
  @ViewChild('overlay', {static: false}) overlayTemplate: TemplateRef<any>;
  @ViewChild('inputElement', {static: false}) inputElement: ElementRef;
  protected ref: NbOverlayRef;
  ViewMode = NbCalendarViewMode;
  visibleDate: any = new Date();
  activeViewMode: any = NbCalendarViewMode.MONTH;
  date: any;
  mask;
  disable;
  propagateChange = (_: any) => {
  };

  constructor(
    protected overlay: NbOverlayService,
    protected positionBuilder: NbPositionBuilderService,
    protected vcr: ViewContainerRef,
    protected cd: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.disable = changes.timeType.currentValue === null || changes.timeType.currentValue === undefined;
    if (changes.value && changes.value.currentValue)
      this.setValueDate(changes.value.currentValue);
    if (changes.timeType && changes.timeType.currentValue) {
      if (this.date) this.writeValue(this.date);
      setTimeout(() => {
        this.mask = this.getMask();
      });
    }
  }

  ngAfterViewInit(): void {
    const positionStrategy = this.positionBuilder.connectedTo(this.inputElement)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.VERTICAL)
      .offset(20);
    this.ref = this.overlay.create({positionStrategy, hasBackdrop: true});
    this.ref.backdropClick().subscribe(() => this.dismissOverlay());
  }

  createOverlay() {
    if (this.readonly || this.disable) return;
    if (this.ref.hasAttached()) {
      return;
    }

    this.ref.attach(new NbTemplatePortal(this.overlayTemplate, this.vcr));
  }

  dismissOverlay() {
    this.ref.detach();
  }

  changeValue() {
    console.log(this.value);
    this.date = this.convertValue(8, 'DDMMYYYY', this.value);
    console.log(this.date);
    if (this.timeType === 'month') {
      this.convertValue(6, 'MMYYYY', this.value);
    }
    if (this.timeType === 'year') {
      this.convertValue(4, 'YYYY', this.value);
    }
    if (this.timeType === 'quarter') {
      this.convertValue(5, 'QYYYY', this.value);
    }
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
  }

  private convertValue(length: number, format: string, value) {
    if (value && value.length === length) {
      const time = moment(value, format);
      if (time.isValid()) {
        this.setValueDate(time.toDate());
      } else {
        this.setValueDate(null);
      }
    }
  }

  getMask() {
    switch (this.timeType) {
      case 'date':
        return '00/00/0000';
      case 'month':
        return '00/0000';
      case 'year':
        return '0000';
      case 'quarter':
        return '0/0000';
    }
  }

  setViewMode(DATE: NbCalendarViewMode) {
    this.activeViewMode = DATE;
  }

  nextYears() {
    this.visibleDate = moment(this.visibleDate).add(1, 'year').toDate();
  }

  prevYears() {
    this.visibleDate = moment(this.visibleDate).subtract(1, 'year').toDate();
  }

  nextPageYears() {
    this.visibleDate = moment(this.visibleDate).add(12, 'year').toDate();
  }

  prevPageYears() {
    this.visibleDate = moment(this.visibleDate).subtract(12, 'year').toDate();
  }

  setVisibleDate(event: any) {
    let format = '';
    let month = event.getMonth();
    let date = event.getDate();
    switch (this.timeType) {
      case 'date':
        format = 'DDMMYYYY';
        break;
      case 'month':
        format = 'MMYYYY';
        date = 1;
        break;
      case 'year':
        format = 'YYYY';
        date = 1;
        month = 1;
        break;
      case 'quarter':
        format = 'QYYYY';
        date = 1;
        break;
    }
    this.visibleDate = moment(event).set({hour: 0, date: date, minute: 0, second: 0, month}).toDate();

  }

  setValueDate(event) {
    if (!event) {
      this.date = null;
      this.propagateChange(this.date);
      return;
    }
    this.setVisibleDate(event);
    let format = '';
    switch (this.timeType) {
      case 'date':
        format = 'DDMMYYYY';
        this.date = moment(event).set({hour: 0, minute: 0, second: 0}).toDate();
        break;
      case 'month':
        this.date = moment(event).set({date: 1, hour: 0, minute: 0, second: 0}).toDate();
        format = 'MMYYYY';
        break;
      case 'year':
        this.date = moment(event).set({month: 0, date: 1, hour: 0, minute: 0, second: 0}).toDate();
        format = 'YYYY';
        break;
      case 'quarter':
        format = 'QYYYY';
        this.date = moment(event).toDate();
        break;
    }
    this.value = moment(event).format(format);
    this.propagateChange(this.date);
  }

  setQuarterDate(i: number) {
    const result = moment(this.visibleDate).set({month: (i - 1) * 3}).toDate();
    this.setValueDate(result);
    this.dismissOverlay();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (!obj || !moment.isDate(obj)) {
      this.visibleDate = new Date();
      this.date = new Date();
      this.value = obj;
    } else {
      this.date = moment(obj).toDate();
      this.visibleDate = moment(obj).toDate();
      let format = '';
      switch (this.timeType) {
        case 'date':
          format = 'DDMMYYYY';
          break;
        case 'month':
          format = 'MMYYYY';
          break;
        case 'year':
          format = 'YYYY';
          break;
        case 'quarter':
          format = 'QYYYY';
          break;
      }
      this.value = moment(this.date).format(format);
    }
    // if (!this.cd['destroyed']) {
    //   this.cd.detectChanges();
    // }
  }

  checkValidTime() {
    if (this.timeType === 'month') {
      this.verifyTime('MMYYYY', this.value);
    }
    if (this.timeType === 'year') {
      this.verifyTime('YYYY', this.value);
    }
    if (this.timeType === 'quarter') {
      this.verifyTime('QYYYY', this.value);
    }
  }

  private verifyTime(format: string, value: any) {
    const time = moment(value, format);
    if (time.isValid()) {
      this.enter.emit();
    } else {
      this.value = null;
    }
    this.dismissOverlay();
  }

  isActiveQuarter(quarter) {
    return (moment(this.visibleDate).quarter() === quarter);
  }

  checkTimeEmpty() {
    if (!this.value) {
      this.propagateChange(null);
    }
  }

}
