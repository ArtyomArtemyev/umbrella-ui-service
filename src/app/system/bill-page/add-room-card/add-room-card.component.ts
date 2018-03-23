import {Component, EventEmitter, Output} from '@angular/core';
import {Room} from '../../shared/models/room.model';

@Component({
  selector: 'wfm-add-room-card',
  templateUrl: './add-room-card.component.html',
  styleUrls: ['./add-room-card.component.scss']
})
export class AddRoomCardComponent {

  @Output('onAddRoom') roomEmitter = new EventEmitter<Room>();

  constructor() { }

  addRoom(countOfBedInput: HTMLInputElement, typeOfBedInput: HTMLInputElement, countOfChildBedInput: HTMLInputElement, priceForChildBed: HTMLInputElement, priceInput: HTMLInputElement) {
    const room: Room = new Room(+countOfBedInput.value, +typeOfBedInput.value, +countOfChildBedInput.value, +priceForChildBed.value,  +priceInput.value);
    this.roomEmitter.emit(room);
  }
}
