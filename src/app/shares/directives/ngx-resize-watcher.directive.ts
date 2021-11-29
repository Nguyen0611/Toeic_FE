import {Directive, AfterContentChecked, ChangeDetectorRef} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Directive({selector: '[ngxResizeWatcher]'})
export class NgxResizeWatcherDirective implements AfterContentChecked {

  constructor(private table: DatatableComponent, public ref: ChangeDetectorRef) {
  }

  private latestWidth: number;

  ngAfterContentChecked() {
    if (this.table && this.table.element.clientWidth !== this.latestWidth) {
      this.latestWidth = this.table.element.clientWidth;
      this.table.recalculate();
      this.table.onWindowResize();
      this.ref.markForCheck();
    }
  }
}
