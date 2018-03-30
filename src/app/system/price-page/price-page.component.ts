import {Component, OnDestroy, OnInit} from '@angular/core';
import {Hotel} from '../shared/models/hotel.model';
import {DefaultTypeRoom} from '../shared/models/default-type-room.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.scss']
})
export class PricePageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  isShowMessageBlock: boolean;
  hotels: Hotel [] = [];
  isShowAddNewHotelPanel: boolean;
  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  currentHotel: Hotel;

  constructor(private hotelService: HotelsService) {
  }

  ngOnInit() {
    this.isShowMessageBlock = false;
    this.sub1 = this.hotelService.getHotels()
      .subscribe((responseHotels: Hotel []) => {
        for (let i = 0; i < responseHotels.length; i++) {
          responseHotels[i].isShownAddInformation = false;
          responseHotels[i].isShownRooms = false;
          responseHotels[i].isDeleteHotelButtonDisabled = false;
          responseHotels[i].isRoomButtonDisabled = false;
          responseHotels[i].isEditHotelButtonDisabled = false;
        }
        this.hotels = responseHotels;
      });
  }


  updateHotelPrice(hotel: Hotel) {
    this.sub2 = this.hotelService.updateHotel(hotel, hotel.id)
      .subscribe((response: any) => {
        this.showEditMessageBlock();
      });
  }

  showEditMessageBlock() {
    this.isShowMessageBlock = true;
    window.setTimeout(() => {
      this.isShowMessageBlock = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
