import { Component } from '@angular/core';
import {Room} from '../shared/models/room.model';
import {Hotel} from '../shared/models/hotel.model';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent {

  name: string;
  city: string;
  address: string;
  countOfStars: number;
  description: string;

  photoName: string;
  rooms: Room [] = [];

  updateRoomList(room: Room) {
    this.rooms.push(room);
  }

  updatePhotoName(photoName: string) {
    this.photoName = photoName;
  }

  updateMainInformation(mainInformation: {name: string; city: string; address: string; countOfStars: number; description: string}) {
    this.name = mainInformation.name;
    this.city = mainInformation.city;
    this.address = mainInformation.address;
    this.countOfStars = mainInformation.countOfStars;
    this.description = mainInformation.description;
  }

  addHotel() {
    const hotel = new Hotel(this.name, this.city, this.address, this.countOfStars, this.description, this.rooms, this.photoName);
    console.log(hotel);
  }
}
