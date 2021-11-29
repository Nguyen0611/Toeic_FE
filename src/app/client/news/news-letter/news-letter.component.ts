import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../@core/services/products.service';
import {CategoriesService} from '../../../@core/services/categories.service';

declare var $: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-news-letter-client',
  styleUrls: ['./news-letter.component.scss'],
  templateUrl: './news-letter.component.html',
})
export class NewsLetterComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  onClick() {
    this.router.navigate(['/trang-chu']);
  }

  key: any;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private route: ActivatedRoute) {
    // this.categoriesService.doSearchByClient({
    //   status: 1,
    // }).subscribe(
    //   (res) => {
    //     console.log(res.body.data);
    //     this.arrCategories = res.body.data.list;
    //   },
    //   (error) => {
    //     // this.isLoad = false;
    //   },
    //   // () => this.isLoad = false,
    // );

  }

  arrCategories = [];

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
