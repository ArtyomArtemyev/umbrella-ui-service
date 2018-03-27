import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
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
  isRoomAdded: boolean;
  action: any;

  @Output('onAddRoom') roomEmitter = new EventEmitter<DefaultTypeRoom>();
  @Output('onShowPricePage') onShowPricePage = new EventEmitter<any>();

  constructor(private defaultTypeRoomService: TypeRoomService) { }

  ngOnInit() {
    this.isRoomAdded = false;
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
      let {typeOfBedInput} = form.value;
      this.showDefaultTypeRoom.typeOfMainBed = typeOfBedInput;
      this.isRoomAdded = true;
      this.roomEmitter.emit(this.showDefaultTypeRoom);
      form.reset();
  }

  getCurrentDefaultTypeOfRoom() {
    this.showDefaultTypeRoom = this.defaultTypeRooms.find(c => c.typeRoomName === this.defaultTypeOfRoomSelector.nativeElement.value);
    this.showDefaultTypeRoom.isVisible = true;
  }

  showLatestPage() {
    this.onShowPricePage.emit(this.action);
  }
}
