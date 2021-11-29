import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Marker} from './marker';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-home-client',
  styleUrls: ['./contact.component.scss'],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
  }

  zoom: number = 18;

  // initial center position for the map
  lat: number = 21.046905;
  lng: number = 105.7842351;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     draggable: true
  //   });
  // }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: Marker[] = [
    {
      lat: 21.046905,
      lng: 105.7842351,
      label: 'Toeic online learning',
      draggable: true
    },
  ]

  ngOnInit(): void {
    function initMap() {
      const uluru = {
        lat: -25.363,
        lng: 131.044
      };
      const grayStyles = [{
        featureType: "all",
        stylers: [{
          saturation: -90
        },
          {
            lightness: 50
          }
        ]
      },
        {
          elementType: 'labels.text.fill',
          stylers: [{
            color: '#ccdee9'
          }]
        }
      ];
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: -31.197,
          lng: 150.744
        },
        zoom: 9,
        // styles: grayStyles,
        scrollwheel: false
      });
    }
  }
}
