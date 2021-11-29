import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {CategoriesService} from '../../../@core/services/categories.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginService} from '../../../@core/services/login.service';
import {UserUpdateComponent} from "../../../admin/sys-users/user-update/user-update.component";
import {NbDialogService, NbToastrService} from "@nebular/theme";
import {TranslateService} from "@ngx-translate/core";
import {UserUpdateClientComponent} from "../../../admin/sys-users/user-update-client/user-update-client.component";

declare const jQuery: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-header-client',
  styleUrls: ['./client-header.component.scss'],
  templateUrl: './client-header.component.html',
})
export class ClientHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  size = 0;
  obj = null;
  totalPrice = null;
  public removeEventListener: () => void;
  public anchors;
  user: any;
  htmlStrTxt: any;
  isCheck = true;
  menu = [];
  menu12 = [];
  cap: any;
  menudacap: any;
  tree = [];
  tree1 = [
    {
      id: 1111,
      parenID: 0,
      tendulieu: 'Home',
      link: 'home',
      check: false
    },
    {
      id: 2111,
      parenID: 0,
      tendulieu: 'About',
      link: 'about',
      check: false
    }
  ];
  tree2 = [
    {
      id: 7111,
      parenID: 0,
      tendulieu: 'Contact',
      link: 'contact', // link đến trang thông tin tương ứng
      check: false
    },
  ];

  tree3 = [
    {
      id: 7111,
      parenID: 0,
      tendulieu: 'TOEIC Listening',
      link: 'contact',
      check: true
    },
    {
      id: 7112,
      parenID: 7111,
      tendulieu: 'Part 1 : Photographs',
      link: 'topic/7',
      check: false
    },
    {
      id: 7113,
      parenID: 7111,
      tendulieu: 'Part 2 : Question and Response',
      link: 'topic/8',
      check: false
    }
  ];

  tree4 = [
    {
      id: 8111,
      parenID: 0,
      tendulieu: 'TOEIC Reading',
      link: 'contact',
      check: true
    },
    {
      id: 8112,
      parenID: 8111,
      tendulieu: 'Part 5 : Incomplete Sentences',
      link: 'topic1/11',
      check: false
    },
    {
      id: 8113,
      parenID: 8111,
      tendulieu: 'Part  7: Single passages',
      link: 'topic1/12',
      check: false
    }
  ];
  userPictureOnly: boolean = false;
  users: any;
  openMenu = false;

  constructor(private router: Router,
              private categoriesService: CategoriesService,
              public domSanitizer: DomSanitizer,
              public el: ElementRef,
              private translate: TranslateService,
              private toastrService: NbToastrService,
              private dialogService: NbDialogService,
              private loginService: LoginService,
              private renderer: Renderer2,
              private elementRef: ElementRef
  ) {
    try {
      console.log("ad");
      const token = localStorage.getItem('httpHeaders');
      if (token.trim().length === 0 && token === null) {
        localStorage.setItem('objectsC', null);
      } else {
        this.loginService.authenticationcate({}).subscribe(res => {
            if (res.status === 200 && res.body.customUserDetails.rolesId === 2) {
              this.tree.push.apply(this.tree, this.tree1);
              this.tree.push.apply(this.tree, this.tree3);
              this.tree.push.apply(this.tree, this.tree4);
            }
          }, err => {
            // nếu có lỗi xảy ra trong qúa trình xác thực lại user thì bắn ra lỗi
          this.tree.push.apply(this.tree, this.tree1);
          this.tree.push.apply(this.tree, this.tree2);
          this.menudacap = this.dequy(0, 0, 1);
          }, () => {
            this.tree.push.apply(this.tree, this.tree2);
            this.search();
          }
        );
      }
    } catch (e) {
      localStorage.setItem('objectsC', null);
      this.tree.push.apply(this.tree, this.tree1);
      this.tree.push.apply(this.tree, this.tree2);
      this.menudacap = this.dequy(0, 0, 1);
    }
  }

  login() {
    this.router.navigate(['auths/login']);
  }

  dk() {
    this.router.navigate(['auths/login']);
  }

  viewUsers(data) {
    this.router.navigate(['info-users']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auths/login']);
  }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('userDetails'));
    if (this.users === undefined || this.users === null || this.users === '') {
      this.isCheck = true;
    } else {
      this.isCheck = false;
    }
    this.removeEventListener = this.renderer.listen(this.elementRef.nativeElement, 'click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        console.log(event.target)
        // Your custom anchor click event handler
        this.handleAnchorClick(event);
      }
    });
    (function ($) {
      let posWrapHeader;
      /*==================================================================
          [ Fixed Header ]*/
      const headerDesktop = $('.container-menu-desktop');
      const wrapMenu = $('.wrap-menu-desktop');

      if ($('.top-bar').length > 0) {
        posWrapHeader = $('.top-bar').height();
      } else {
        posWrapHeader = 0;
      }


      if ($(window).scrollTop() > posWrapHeader) {
        console.log(posWrapHeader);
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
      } else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
      }

      $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
          $(headerDesktop).addClass('fix-menu-desktop');
          $(wrapMenu).css('top', 0);
        } else {
          $(headerDesktop).removeClass('fix-menu-desktop');
          $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
      });


      /*==================================================================
      [ Menu mobile ]*/
      $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
      });

      const arrowMainMenu = $('.arrow-main-menu-m');

      for (let i = 0; i < arrowMainMenu.length; i++) {
        $(arrowMainMenu[i]).on('click', function () {
          $(this).parent().find('.sub-menu-m').slideToggle();
          $(this).toggleClass('turn-arrow-main-menu-m');
        });
      }

      $(window).resize(function () {
        if ($(window).width() >= 992) {
          if ($('.menu-mobile').css('display') === 'block') {
            $('.menu-mobile').css('display', 'none');
            $('.btn-show-menu-mobile').toggleClass('is-active');
          }

          $('.sub-menu-m').each(function () {
            if ($(this).css('display') === 'block') {
              $(this).css('display', 'none');
              $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
            }
          });

        }
      });

      /*==================================================================
   [ Cart ]*/
      $('.js-show-cart').on('click', function () {
        $('.js-panel-cart').addClass('show-header-cart');
      });

      $('.js-hide-cart').on('click', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
      });

      /*==================================================================
      [ Cart ]*/
      $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
      });

      $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
      });

      /*==================================================================
      [ +/- num product ]*/
      $('.btn-num-product-down').on('click', function () {
        const numProduct = Number($(this).next().val());
        if (numProduct > 0) $(this).next().val(numProduct - 1);
      });

      $('.btn-num-product-up').on('click', function () {
        const numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
      });

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        const nameTab = $(e.target).attr('href');
        $(nameTab).find('.slick2').slick('reinit');
      });
    })(jQuery);
  }

  public handleAnchorClick = (event: Event) => {
    // Prevent opening anchors the default way
    event.preventDefault();
    const anchor = event.target as HTMLAnchorElement;
    console.log(anchor.href.replace(/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1').slice(10));
    this.router.navigate([anchor.href.replace(/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1').slice(10)]);
  };


  formatListPractices(data, paren) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      if (data[i].parenId === 0) {
        dataItem.check = true;
        arr.push(dataItem);
      } else {
        for (let j = 0; j < data.length; j++) {
          if (dataItem.id === data[j].parenId) {
            dataItem.check = true;
            break;
          } else {
            dataItem.check = false;
          }
        }
        arr.push(dataItem);
      }
    }
    return arr;
  }

  ngOnDestroy() {
    this.anchors.forEach((anchor: HTMLAnchorElement) => {
      anchor.removeEventListener('click', this.handleAnchorClick);
    });
  }

  ngAfterViewInit() {
    // Solution for catching click events on anchors using querySelectorAll:
    this.anchors = this.elementRef.nativeElement.querySelectorAll('a');
    this.anchors.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('click', this.handleAnchorClick);
    });
  }

  dequy(parent, level, a) {
    if (a === 1) {
      this.htmlStrTxt = '<ul class="main-menu">';
    }
    if (a !== 1) {
      this.htmlStrTxt = '<ul class="list_tieu_de">';
    }
    a++;
    for (let x = 0; x < this.tree.length; x++) {
      if (this.tree[x].parenID === parent) {
        this.htmlStrTxt += '<li class="tieu_de level-' + level + '"><a href="/toeic-web/' + this.tree[x].link + '" class="nd_tieu_de">' + this.tree[x].tendulieu + '</a>';
        if (this.tree[x].check) {
          if (level !== 0) {
            this.htmlStrTxt += '<span class="caret"><i class="fa fa-caret-right" aria-hidden="true"></i></span>';
          } else {
            this.htmlStrTxt += '<span class="caret"><i class="fa fa-caret-down" aria-hidden="true"></i></span>';
          }
          this.htmlStrTxt += this.dequy(this.tree[x].id, level + 1, 0);
        }
        this.htmlStrTxt += '</li>';
      }
    }
    if (this.cap < level) {
      this.cap = level;
    }
    return this.htmlStrTxt + '</ul>';
  }

  over() {
    $(function () {
      // let cap = $('#menu').attr('data-cap');
      for (let i = 0; i < 4; i++) {
        $('.level-' + i).hover(function () {
          $(this).children('ul').addClass('hienthimenu');
        }, function () {
          $(this).children('ul').removeClass('hienthimenu');
        });
      }
    });
  }

  out() {
  }

  search() {

    const token = localStorage.getItem('userDetails');
    if (token === undefined || token === null || token === '') {
      // localStorage.clear();
      // this.router.navigate(['/auths/login']);
      return false;
    } else {
      this.menudacap = this.dequy(0, 0, 1);
    }
  }
}
