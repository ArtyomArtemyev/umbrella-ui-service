import {Component, OnInit} from '@angular/core';
import {Hotel} from '../shared/models/hotel.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {UploadFileService} from '../../shared/services/upload-file.service';

@Component({
  selector: 'wfm-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.scss']
})
export class HotelsPageComponent implements OnInit {

  hotels: Hotel [] = [];

  constructor(private hotelService: HotelsService, private fileService: UploadFileService) {
  }

  ngOnInit() {
    this.hotelService.getHotels()
      .subscribe((responseHotels: Hotel []) => {
       for (let i = 0; i < responseHotels.length; i++) {
         responseHotels[i].isShownAddInformation = false;
         responseHotels[i].isShownRooms = false;
         responseHotels[i].isDeleteHotelButtonDisabled = false;
         responseHotels[i].isRoomButtonDisabled = false;
       }
       this.hotels = responseHotels;
      });
  }

  deleteHotel(hotel: Hotel) {
    this.hotelService.deleteHotel(hotel)
      .subscribe((response: any) => {
        this.remove(this.hotels, hotel);
      });
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
