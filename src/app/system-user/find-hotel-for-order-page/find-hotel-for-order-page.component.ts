import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Hotel} from '../../system/shared/models/hotel.model';
import {NgForm} from '@angular/forms';
import {Message} from '../../shared/models/message.models';
import {HotelsService} from '../../shared/services/hotels.service';
import {FindHotel} from '../../system/shared/models/find-hotel.model';
import {HotelSuggestion} from '../shared/models/hotel-suggestion.model';

@Component({
  selector: 'wfm-find-hotel-for-order-page',
  templateUrl: './find-hotel-for-order-page.component.html',
  styleUrls: ['./find-hotel-for-order-page.component.scss']
})
export class FindHotelForOrderPageComponent implements OnInit {
  message: Message;
  isShowMessageBlock: boolean;
  hotels: Hotel [] = [];
  hotelSuggestions: HotelSuggestion [] = [];

  @ViewChild('showMessageBlock') showMessageBlock: ElementRef;
  existChildBedInRoom: boolean;

  constructor(private hotelService: HotelsService) {
  }

  ngOnInit() {
    this.existChildBedInRoom = false;
    this.isShowMessageBlock = false;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const {childBedInRoom, findHotelPageCityInput, findHotelPageCountMenDiv, findHotelPageDateEndInput, findHotelPageDateInput} = form.value;
    if (findHotelPageCountMenDiv <= 0) {
      this.showMessage(new Message('', 'Количество человек не может быть меньше нуля или равным нулю'));
    } else {
      if (new Date(findHotelPageDateEndInput) < new Date(findHotelPageDateInput)) {
        this.showMessage(new Message('', 'Дата выезда не может быть раньше даты заезда'));
      } else {
        const findHotelObject = new FindHotel(this.existChildBedInRoom, findHotelPageCityInput, +findHotelPageCountMenDiv, findHotelPageDateInput, findHotelPageDateEndInput);
        this.hotelService.findHotel(findHotelObject)
          .subscribe((response: HotelSuggestion []) => {
            this.hotelSuggestions = response;
            this.hotelSuggestions.map(c => c.isShowSuggestion = false);
            this.hotelSuggestions.map( c => c.orderSuggestions.map( oc => oc.isShow = false));
            console.log(this.hotelSuggestions);
          });
      }
    }

    // if (+this.countMenDiv.nativeElement.innerHTML === 0) {
    //   this.isCountOfMenValid = !this.isCountOfMenValid;
    //   window.setTimeout(() => this.isCountOfMenValid = !this.isCountOfMenValid, 5000);
    // } else {
    //   const {findHotelPageCityInput, findHotelPageDateEndInput, findHotelPageDateInput} = form.value;
    //   const reqiuredHotel: RequireHotel = new RequireHotel(findHotelPageCityInput, new Date(findHotelPageDateEndInput), new Date(findHotelPageDateInput), +this.countMenDiv.nativeElement.innerHTML, +this.countChildDiv.nativeElement.innerHTML);
    //   console.log(reqiuredHotel);
    // }

  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }

}
