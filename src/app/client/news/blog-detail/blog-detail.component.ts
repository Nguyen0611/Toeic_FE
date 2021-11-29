import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsService} from '../../../@core/services/products.service';
import {NbToastrService} from '@nebular/theme';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./blog-detail.component.scss'],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  key: any;
  key1: any;
  arr = [];
  data: any;
  id: any;
  body: any;
  bodyNews: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: NbToastrService,
              private productsService: ProductsService,
              private route: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.key = params['key'];
      console.log(this.key);
    });
    this.route.queryParams.subscribe(
      params => {
        this.data = params['profile'];
        console.log('Got param: ', this.data);
        this.productsService.doSearch2((this.data)).subscribe(res => {
            console.log(res);
            if (res.body.data.list?.length === 1) {
              this.bodyNews = res.body.data.list[0];
              this.body = null;
              if (this.bodyNews) {
                this.body = '<p>' + this.bodyNews.bodyNews.replace(/(\r\n|\n|\r)/g, '</p> <p>');
              }
            } else {
              this.router.navigate(['trang-chu']);
              this.toastr.danger('Không tìm thấy bài viết, vui lòng thử lại sau!', 'Thông báo');
            }

          },
          (error) => {
            this.router.navigate(['trang-chu']);
            this.toastr.danger('Không tìm thấy bài viết, vui lòng thử lại sau!', 'Thông báo');
          });
      }
    );
  }


  ngOnInit(): void {

    const $topeContainer = $('.isotope-grid');
    const $filter = $('.filter-tope-group');
    // filter items on button click
    $filter.each(function () {
      $filter.on('click', 'button', function () {
        const filterValue = $(this).attr('data-filter');
        $topeContainer.isotope({filter: filterValue});
      });

    });

    // init Isotope
    $(window).on('load', function () {
      const $grid = $topeContainer.each(function () {
        $(this).isotope({
          itemSelector: '.isotope-item',
          layoutMode: 'fitRows',
          percentPosition: true,
          animationEngine: 'best-available',
          masonry: {
            columnWidth: '.isotope-item'
          }
        });
      });
    });

    const isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function () {
      $(this).on('click', function () {
        for (let i = 0; i < isotopeButton.length; i++) {
          $(isotopeButton[i]).removeClass('how-active1');
        }

        $(this).addClass('how-active1');
      });
    });

  }
}
