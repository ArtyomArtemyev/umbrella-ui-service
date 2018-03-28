import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HotelsService} from '../../shared/services/hotels.service';
import {Hotel} from '../shared/models/hotel.model';
import {DefaultTypeRoom} from '../shared/models/default-type-room.model';
import {TypeRoomService} from '../../shared/services/type-room.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'wfm-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  @ViewChild('defaultTypeOfRoomSelector') defaultTypeOfRoomSelector: ElementRef;

  hotels: Hotel [] = [];
  isShowAddNewHotelPanel: boolean;
  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  currentHotel: Hotel;
  isShowMessageBlock: boolean;

  constructor(private hotelService: HotelsService, private defaultTypeRoomService: TypeRoomService) { }

  ngOnInit() {
    this.isShowMessageBlock = false;
    this.isShowAddNewHotelPanel = false;
    this.hotelService.getHotels()
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
    let {typeOfBedInput} = form.value;
    this.showDefaultTypeRoom.typeOfMainBed = typeOfBedInput;
    this.currentHotel.rooms.push(this.showDefaultTypeRoom);
    this.hotelService.updateHotel(this.currentHotel, this.currentHotel.id)
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
}
