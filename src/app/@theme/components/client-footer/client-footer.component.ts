import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FacebookService, InitParams} from 'ngx-facebook';
declare var jQuery: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-footer-client', // khai báo selector cho components - giống như thẻ HTML
  styleUrls: ['./client-footer.component.scss'], // Khai báo file style mà component này sử dụng
  templateUrl: './client-footer.component.html', // Khai báo file mà component này đại diện - view
})
export class ClientFooterComponent implements OnInit, OnDestroy {
  constructor(private facebookService: FacebookService) {
  }

  topWeb() {

  }

  ngOnInit(): void { // hiển thị các thuộc tính ràng buộc dữ liệu và đặt các thuộc tính đầu vào của directive / component.
    this.initFacebookService();
    (function ($) {
      const windowH = $(window).height() / 2;

      $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
          $('#myBtn').css('display', 'flex');
        } else {
          $('#myBtn').css('display', 'none');
        }
      });

      $('#myBtn').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 300);
      });
    })(jQuery);

  }

  private initFacebookService(): void {
    const initParams: InitParams = {xfbml: true, version: 'v8.0'};
    // this.facebookService.init(initParams);
  }


  ngOnDestroy() { // Dọn dẹp ngay trước khi Angular phá hủy directive / component. Hủy đăng ký Observables và tách trình xử lý sự kiện để
    // tránh rò rỉ bộ nhớ. Được gọi ngay trước khi Angular phá hủy directive / component.
  }

  scroll = (event): void => {
  };

}

