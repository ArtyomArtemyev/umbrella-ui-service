import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Room} from '../../shared/models/room.model';
import {DefaultTypeRoom} from '../../shared/models/default-type-room.model';
import {TypeRoomService} from '../../../shared/services/type-room.service';

@Component({
  selector: 'wfm-room-information-card',
  templateUrl: './room-information-card.component.html',
  styleUrls: ['./room-information-card.component.scss']
})
export class RoomInformationCardComponent implements OnInit {
  @ViewChild('defaultTypeOfRoomSelector') defaultTypeOfRoomSelector: ElementRef;

  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  existChildBedInRoom: boolean;

  @Output('onAddRoom') roomEmitter = new EventEmitter<Room>();

  constructor(private defaultTypeRoomService: TypeRoomService) { }

  ngOnInit() {
    this.showDefaultTypeRoom.isVisible = false;
    this.existChildBedInRoom = true;
    this.defaultTypeRoomService.getRooms()
      .subscribe((responseTypeRoom: DefaultTypeRoom[]) => {
        for (let i = 0; i < responseTypeRoom.length; i++) {
          responseTypeRoom[i].isVisible = false;
        }
        this.defaultTypeRooms = responseTypeRoom;
        this.showDefaultTypeRoom = this.defaultTypeRooms[0];
        console.log(this.showDefaultTypeRoom);
      });
  }

  onSubmit(form: NgForm) {
    // if (this.existChildBedInRoom) {
    //   let {countOfBedInput, countOfChildBedInput, priceForChildBed, priceInput, typeOfBedInput} = form.value;
    //   if (typeOfBedInput === 'Односпальная') {
    //     typeOfBedInput = 1;
    //   } else {
    //     typeOfBedInput = 2;
    //   }
    //   const room: Room = new Room(+countOfBedInput, +typeOfBedInput, +countOfChildBedInput, +priceForChildBed,  +priceInput);
    //   this.roomEmitter.emit(room);
    // }
    // else {
    //   let {countOfBedInput, priceInput, typeOfBedInput} = form.value;
    //   if (typeOfBedInput === 'Односпальная') {
    //     typeOfBedInput = 1;
    //   } else {
    //     typeOfBedInput = 2;
    //   }
    //   const room: Room = new Room(+countOfBedInput, +typeOfBedInput, +0, +0,  +priceInput);
    //   form.reset();
    //   this.roomEmitter.emit(room);
    // }

  }

  getCurrentDefaultTypeOfRoom() {
    this.showDefaultTypeRoom = this.defaultTypeRooms.find(c => c.typeRoomName === this.defaultTypeOfRoomSelector.nativeElement.value);
    this.showDefaultTypeRoom.isVisible = true;
  }

}
