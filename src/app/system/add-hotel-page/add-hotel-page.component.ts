import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Room} from '../shared/models/room.model';
import {Hotel} from '../shared/models/hotel.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {Router} from '@angular/router';

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
  rooms: Room [] = [];
  photoName: string;
  isMainInformationAdded: boolean;
  isPhotoLoaded: boolean;
  isRoomsAdded: boolean;

  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit() {
    this.isPhotoLoaded = false;
    this.isRoomsAdded = false;
    this.isMainInformationAdded = false;
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

  updateRoomList(room: Room) {
    this.rooms.push(room);
    this.isRoomsAdded = true;
  }

  addHotel() {
    if (this.isRoomsAdded === true && this.isMainInformationAdded === true && this.isPhotoLoaded === true) {
      const hotel = new Hotel(this.name, this.city, this.address, this.countOfStars, this.description, this.rooms, this.photoName);
      this.hotelService.createNewHotel(hotel)
        .subscribe((hotel: Hotel) => {
          this.router.navigate(['/system', 'hotels']);
        });
    } else {
      if (!this.isRoomsAdded) {
        alert('Заполните информацию о номерах отеля');
        this.addRoomInformationMessageBlock.nativeElement.setAttribute('class', 'alert alert-danger');
      }
      if (!this.isMainInformationAdded) {
        alert('Заполните информцию об отеле');
        this.addMainInformationMessageBlock.nativeElement.setAttribute('class', 'alert alert-danger');
      }
      if (!this.isPhotoLoaded) {
        alert('Загрузите фотографию');
      }
    }
  }


  deleteRoom(room: Room) {
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
}
