import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Hotel} from '../shared/models/hotel.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {Router} from '@angular/router';
import {DefaultTypeRoom} from '../shared/models/default-type-room.model';
import {ServicePrice} from '../shared/models/service-price.model';

@Component({
  selector: 'wfm-add-hotel-page',
  templateUrl: './add-hotel-page.component.html',
  styleUrls: ['./add-hotel-page.component.scss']
})
export class AddHotelPageComponent implements OnInit {
  @ViewChild('uploadPhotoCheckbox') uploadPhotoCheckbox: ElementRef;
  @ViewChild('addPagenameInput') nameInput: ElementRef;
  @ViewChild('addPagecityInput') cityInput: ElementRef;
  @ViewChild('addPageaddressInput') addressInput: ElementRef;
  @ViewChild('addPagecountOfStarsInput') countOfStarsInput: ElementRef;
  @ViewChild('addPagedescriptionInput') descriptionInput: ElementRef;
  @ViewChild('addMainInformationMessageBlock') addMainInformationMessageBlock: ElementRef;
  @ViewChild('addRoomInformationMessageBlock') addRoomInformationMessageBlock: ElementRef;

  name: string;
  city: string;
  address: string;
  countOfStars: number;
  description: string;
  rooms: DefaultTypeRoom [] = [];
  photoName: string;
  isMainInformationAdded: boolean;
  isPhotoLoaded: boolean;
  isRoomsAdded: boolean;
  isLatestPage: boolean;
  isShowPricePage: boolean;
  servicesPrices: ServicePrice [];

  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit() {
    this.isPhotoLoaded = false;
    this.isRoomsAdded = false;
    this.isMainInformationAdded = false;
    this.isLatestPage = false;
    this.isShowPricePage = false;
  }

  updatePhotoName(photoName: string) {
    this.photoName = photoName;
    this.isPhotoLoaded = true;
  }

  updateMainInformation(mainInformation: {name: string; city: string; address: string; countOfStars: number; description: string}) {
    this.name = mainInformation.name;
    this.city = mainInformation.city;
    this.address = mainInformation.address;
    this.countOfStars = +mainInformation.countOfStars;
    this.description = mainInformation.description;
    this.isMainInformationAdded = true;
  }

  updateRoomList(room: DefaultTypeRoom) {
    console.log(room);
    this.rooms.push(room);
    this.isRoomsAdded = true;
  }

  addHotel() {
    if (this.isRoomsAdded === true && this.isMainInformationAdded === true && this.isPhotoLoaded === true) {
      const hotel = new Hotel(this.name, this.city, this.address, this.countOfStars, this.description, this.rooms, this.photoName, this.servicesPrices);
      this.hotelService.createNewHotel(hotel)
        .subscribe((hotel: Hotel) => {
          this.router.navigate(['/system', 'hotels']);
        });
    }
  }


  deleteRoom(room: DefaultTypeRoom) {
    this.remove(this.rooms, room);
    if (this.rooms.length === 0) {
      this.isRoomsAdded = false;
    }
  }

   remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  showPricePage($event: any) {
    this.isShowPricePage = true;
  }

  updateSericePrice(listServicesPrices: ServicePrice[]) {
    this.servicesPrices = listServicesPrices;
    this.isLatestPage = true;
  }
}
