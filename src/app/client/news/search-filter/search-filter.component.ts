import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-search-filter',
  styleUrls: ['./search-filter.component.scss'],
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }


  ngOnInit(): void {
    $('.js-show-filter').on('click', function () {
      $(this).toggleClass('show-filter');
      $('.panel-filter').slideToggle(400);

      if ($('.js-show-search').hasClass('show-search')) {
        $('.js-show-search').removeClass('show-search');
        $('.panel-search').slideUp(400);
      }
    });

  }
}
