import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HotelsService} from '../../shared/services/hotels.service';
import {Hotel} from '../../system/shared/models/hotel.model';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../shared/models/user.model';
import {Review} from '../../shared/models/review.model';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {
  @ViewChild('typeOfFindSelector') typeOfFindSelector: ElementRef;
  findCriteria: string;
  hotels: Hotel [] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  @ViewChild('review') review: ElementRef;
  user: User;

  constructor(private hotelService: HotelsService) {
  }

  ngOnInit() {
  }

  setTypeOfFind() {
    this.findCriteria = this.typeOfFindSelector.nativeElement.value;
  }

  onSubmit(form: NgForm) {
    if (this.typeOfFindSelector.nativeElement.value === 'HotelName') {
      this.sub1 = this.hotelService.findHotelsByHotelName(form.value)
        .subscribe((response: Hotel []) => {
          response.map(c => c.isShownAddInformation = false);
          this.hotels = [];
          this.hotels = response;
        });
    } else {
      this.sub2 = this.hotelService.findHotelsByLocation(form.value)
        .subscribe((response: Hotel []) => {
          response.map(c => c.isShownAddInformation = false);
          this.hotels = [];
          this.hotels = response;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  addReview(hotel: Hotel) {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    const userReview: Review = new Review(this.user, hotel, this.review.nativeElement.value, new Date(), token);
    this.sub3 = this.hotelService.addReview(userReview)
      .subscribe((response: any) => {

      });
  }
}
