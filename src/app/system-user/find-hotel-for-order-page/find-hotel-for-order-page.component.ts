import {Component, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {Hotel} from '../../system/shared/models/hotel.model';
import {NgForm} from '@angular/forms';
import {RequireHotel} from '../shared/models/require-hotel.model';

@Component({
  selector: 'wfm-find-hotel-for-order-page',
  templateUrl: './find-hotel-for-order-page.component.html',
  styleUrls: ['./find-hotel-for-order-page.component.scss']
})
export class FindHotelForOrderPageComponent implements OnInit {
  @ViewChild('countMenDiv') countMenDiv;
  @ViewChild('countChildDiv') countChildDiv;

  isCountOfMenValid: boolean;
  hotels: Hotel [] = [];

  constructor() {
  }

  ngOnInit() {
    this.isCountOfMenValid = true;
    $(document).ready(() => {
      $('.minus-button').click((e) => {

        // change this to whatever minimum you'd like
        const minValue = 0;

        const currentInput = $(e.currentTarget).parent().prev()[0];

        let minusInputValue = $(currentInput).html();

        if (minusInputValue > minValue) {
          minusInputValue--;
          $($(e.currentTarget).next()).removeAttr('disabled');
          $(currentInput).html(minusInputValue);

          if (minusInputValue <= minValue) {
            $(e.currentTarget).attr('disabled', 'disabled');
          }
        }
      });

      $('.plus-button').click((e) => {

        const maxValue = 10;

        const currentInput = $(e.currentTarget).parent().prev()[0];

        let plusInputValue = $(currentInput).html();

        if (plusInputValue < maxValue) {
          plusInputValue++;
          $($(e.currentTarget).prev()[0]).removeAttr('disabled');
          $(currentInput).html(plusInputValue);

          if (plusInputValue >= maxValue) {
            $(e.currentTarget).attr('disabled', 'disabled');
          }
        }
      });

    });
  }

  onSubmit(form: NgForm) {
    if (+this.countMenDiv.nativeElement.innerHTML === 0) {
      this.isCountOfMenValid = !this.isCountOfMenValid;
      window.setTimeout(() => this.isCountOfMenValid = !this.isCountOfMenValid, 5000);
    } else {
      const {findHotelPageCityInput, findHotelPageDateEndInput, findHotelPageDateInput} = form.value;
      const reqiuredHotel: RequireHotel = new RequireHotel(findHotelPageCityInput, new Date(findHotelPageDateEndInput), new Date(findHotelPageDateInput), +this.countMenDiv.nativeElement.innerHTML, +this.countChildDiv.nativeElement.innerHTML);
      console.log(reqiuredHotel);
    }

  }

}
