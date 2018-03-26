import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Room} from '../../shared/models/room.model';

@Component({
  selector: 'wfm-room-information-card',
  templateUrl: './room-information-card.component.html',
  styleUrls: ['./room-information-card.component.scss']
})
export class RoomInformationCardComponent implements OnInit {
  existChildBedInRoom: boolean;

  @ViewChild('childBedInRoom') childBedInRoom: ElementRef;

  @Output('onAddRoom') roomEmitter = new EventEmitter<Room>();

  constructor() { }

  ngOnInit() {
    this.existChildBedInRoom = false;
  }

  onSubmit(form: NgForm) {
    if (this.existChildBedInRoom) {
      let {countOfBedInput, countOfChildBedInput, priceForChildBed, priceInput, typeOfBedInput} = form.value;
      if (typeOfBedInput === 'Односпальная') {
        typeOfBedInput = 1;
      } else {
        typeOfBedInput = 2;
      }
      const room: Room = new Room(+countOfBedInput, +typeOfBedInput, +countOfChildBedInput, +priceForChildBed,  +priceInput);
      this.roomEmitter.emit(room);
    }
    else {
      let {countOfBedInput, priceInput, typeOfBedInput} = form.value;
      if (typeOfBedInput === 'Односпальная') {
        typeOfBedInput = 1;
      } else {
        typeOfBedInput = 2;
      }
      const room: Room = new Room(+countOfBedInput, +typeOfBedInput, +0, +0,  +priceInput);
      form.reset();
      this.roomEmitter.emit(room);
    }

  }
}
