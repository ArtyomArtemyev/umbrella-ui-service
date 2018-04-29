import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HotelReviews} from '../../shared/models/hotel-review.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {Subscription} from 'rxjs/Subscription';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'wfm-hotels-reviews',
  templateUrl: './hotels-reviews.component.html',
  styleUrls: ['./hotels-reviews.component.scss']
})
export class HotelsReviewsComponent implements OnInit, OnDestroy {
  hotelReviews: HotelReviews [] = [];
  showHotelReviews: HotelReviews [] = [];
  sub1: Subscription;
  private startIndex = 0;
  private endIndex = 0;

  constructor(private hotelService: HotelsService) {

  }

  ngOnInit() {
    this.sub1 = this.hotelService.getAllReviews()
      .subscribe((response: HotelReviews []) => {
        response.map(c => c.isShowReviews = false);
        this.hotelReviews = response;
        console.log(+this.hotelReviews.length);
        if (+this.hotelReviews.length <= 5) {
          this.endIndex = +this.hotelReviews.length;
          this.showHotelReviews = this.hotelReviews.slice(this.startIndex, this.endIndex);
        } else {
          this.endIndex = 5;
          this.showHotelReviews = this.hotelReviews.slice(this.startIndex, this.endIndex);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  plusPage() {
      if (this.endIndex + 4 > +this.hotelReviews.length) {
        this.startIndex = this.endIndex;
        this.endIndex = +this.hotelReviews.length;
        this.showHotelReviews = this.hotelReviews.slice(this.startIndex, this.endIndex);
      } else {
        this.startIndex = this.endIndex;
        this.endIndex = this.endIndex + 5;
        this.showHotelReviews = this.hotelReviews.slice(this.startIndex, this.endIndex);
      }
  }

  minPage() {
    this.endIndex = this.startIndex;
    this.startIndex = this.startIndex - 5;
    this.showHotelReviews = this.hotelReviews.slice(this.startIndex, this.endIndex);
  }
}
