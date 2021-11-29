import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroPickerComponent} from './hero-picker.component';
import {NbCalendarKitModule, NbCalendarModule, NbCardModule, NbInputModule} from '@nebular/theme';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HeroPickerComponent],
  exports: [
    HeroPickerComponent
  ],
  imports: [
    CommonModule,
    NbCalendarKitModule,
    FormsModule,
    NbCardModule,
    NgxMaskModule,
    NbCalendarModule,
    NbInputModule
  ]
})
export class HeroPickerModule { }
