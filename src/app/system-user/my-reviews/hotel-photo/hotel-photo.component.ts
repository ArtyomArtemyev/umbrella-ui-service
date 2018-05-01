import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wfm-hotel-photo',
  templateUrl: './hotel-photo.component.html',
  styleUrls: ['./hotel-photo.component.scss']
})
export class HotelPhotoComponent implements OnInit {

  @Input() fileUpload: string;

  constructor() { }

  ngOnInit() {
  }
}
