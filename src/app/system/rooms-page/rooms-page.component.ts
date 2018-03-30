import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HotelsService} from '../../shared/services/hotels.service';
import {Hotel} from '../shared/models/hotel.model';
import {DefaultTypeRoom} from '../shared/models/default-type-room.model';
import {TypeRoomService} from '../../shared/services/type-room.service';
import {NgForm} from '@angular/forms';
import {ServicePrice} from '../shared/models/service-price.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  @ViewChild('defaultTypeOfRoomSelector') defaultTypeOfRoomSelector: ElementRef;

  hotels: Hotel [] = [];
  isShowAddNewHotelPanel: boolean;
  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  currentHotel: Hotel;
  isShowMessageBlock: boolean;
  isDublicateRoom: boolean;

  constructor(private hotelService: HotelsService, private defaultTypeRoomService: TypeRoomService) {
  }

  ngOnInit() {
    this.isDublicateRoom = false;
    this.isShowMessageBlock = false;
    this.isShowAddNewHotelPanel = false;
    this.sub1 = this.hotelService.getHotels()
      .subscribe((responseHotels: Hotel []) => {
        for (let i = 0; i < responseHotels.length; i++) {
          responseHotels[i].isShownAddInformation = false;
          responseHotels[i].isShownRooms = false;
          responseHotels[i].isDeleteHotelButtonDisabled = false;
          responseHotels[i].isRoomButtonDisabled = false;
          responseHotels[i].isEditHotelButtonDisabled = false;

          this.defaultTypeRoomService.getRooms()
            .subscribe((responseTypeRoom: DefaultTypeRoom[]) => {
              for (let i = 0; i < responseTypeRoom.length; i++) {
                responseTypeRoom[i].isVisible = false;
              }
              this.defaultTypeRooms = responseTypeRoom;
              this.showDefaultTypeRoom = this.defaultTypeRooms[0];
            });
        }
        this.hotels = responseHotels;
      });
  }

  getCurrentDefaultTypeOfRoom() {
    this.showDefaultTypeRoom = this.defaultTypeRooms.find(c => c.typeRoomName === this.defaultTypeOfRoomSelector.nativeElement.value);
    this.showDefaultTypeRoom.isVisible = true;
  }


  dropDownPanelAndCurrentHottel(hotel: Hotel) {
    this.isShowAddNewHotelPanel = !this.isShowAddNewHotelPanel;
    if (this.isShowAddNewHotelPanel) {
      this.currentHotel = hotel;
    } else {
      this.currentHotel = undefined;
    }
  }

  onSubmit(form: NgForm) {
    let {newRoomsPrice, typeOfBedInput} = form.value;
    this.showDefaultTypeRoom.typeOfMainBed = typeOfBedInput;
    const checkRoom: DefaultTypeRoom = this.currentHotel.rooms.find(c =>
      c.typeRoomName === this.showDefaultTypeRoom.typeRoomName && c.typeOfMainBed === this.showDefaultTypeRoom.typeOfMainBed && c.existBar === this.showDefaultTypeRoom.existBar && c.existBalcony === this.showDefaultTypeRoom.existBalcony && c.existTV === this.showDefaultTypeRoom.existTV);
    if (checkRoom !== undefined) {
      this.isDublicateRoom = true;
      window.setTimeout(() => {
        this.isDublicateRoom = false;
        form.reset();
      }, 4000);
    } else {
      const checkPriceForRoom: DefaultTypeRoom = this.currentHotel.rooms.find(c => c.typeRoomName === this.showDefaultTypeRoom.typeRoomName);
      if (checkPriceForRoom === undefined) {
        let singelServicePrice: ServicePrice = new ServicePrice(this.showDefaultTypeRoom.typeRoomName, newRoomsPrice, true);
        this.currentHotel.servicesPrice.push(singelServicePrice);
      }
      this.currentHotel.rooms.push(this.showDefaultTypeRoom);
      this.sub2 = this.hotelService.updateHotel(this.currentHotel, this.currentHotel.id)
        .subscribe((response: any) => {
          this.showEditMessageBlock();
          form.reset();
        });
    }
  }

  showEditMessageBlock() {
    this.isShowMessageBlock = true;
    window.setTimeout(() => {
      this.isShowMessageBlock = false;
    }, 1000);
  }

  deleteRoom(hotel: Hotel, room: DefaultTypeRoom) {
    this.remove(hotel.rooms, room);
    this.hotelService.updateHotel(hotel, hotel.id)
      .subscribe((response: any) => {
        this.showEditMessageBlock();
      });
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  changeRoom(hotel: Hotel) {
    this.hotelService.updateHotel(hotel, hotel.id)
      .subscribe((response: any) => {
        this.showEditMessageBlock();
      });
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
