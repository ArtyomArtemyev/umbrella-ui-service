import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DefaultTypeRoom} from '../../shared/models/default-type-room.model';
import {TypeRoomService} from '../../../shared/services/type-room.service';
import {Message} from '../../../shared/models/message.models';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-room-information-card',
  templateUrl: './room-information-card.component.html',
  styleUrls: ['./room-information-card.component.scss']
})
export class RoomInformationCardComponent implements OnInit, OnDestroy {
  sub1: Subscription;

  @ViewChild('defaultTypeOfRoomSelector') defaultTypeOfRoomSelector: ElementRef;

  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  existChildBedInRoom: boolean;
  isRoomAdded: boolean;
  action: any;
  message: Message;
  isShowMessageBlock: boolean;

  @Input() isDublicateRoom: boolean;
  @Output('onAddRoom') roomEmitter = new EventEmitter<DefaultTypeRoom>();
  @Output('onShowPricePage') onShowPricePage = new EventEmitter<any>();

  constructor(private defaultTypeRoomService: TypeRoomService) {
  }

  ngOnInit() {
    this.isDublicateRoom = false;
    this.isRoomAdded = false;
    this.showDefaultTypeRoom.isVisible = false;
    this.existChildBedInRoom = true;
    this.isShowMessageBlock = false;
    this.sub1 = this.defaultTypeRoomService.getRooms()
      .subscribe((responseTypeRoom: DefaultTypeRoom[]) => {
        for (let i = 0; i < responseTypeRoom.length; i++) {
          responseTypeRoom[i].isVisible = false;
        }
        this.defaultTypeRooms = responseTypeRoom;
        this.showDefaultTypeRoom = this.defaultTypeRooms[0];
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

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
