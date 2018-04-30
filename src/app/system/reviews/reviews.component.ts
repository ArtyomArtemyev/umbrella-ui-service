import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HotelReviews} from '../../shared/models/hotel-review.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {Subscription} from 'rxjs/Subscription';
import {Review} from '../../shared/models/review.model';
import {Message} from '../../shared/models/message.models';

@Component({
  selector: 'wfm-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  hotelReviews: HotelReviews [] = [];
  showHotelReviews: HotelReviews [] = [];
  sub1: Subscription;
  sub2: Subscription;
  private startIndex = 0;
  private endIndex = 0;
  isShowMessageBlock: boolean;
  message: Message;

  constructor(private hotelService: HotelsService) {

  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }

  ngOnInit() {
    this.isShowMessageBlock = false;
    this.sub1 = this.hotelService.getAllReviews()
      .subscribe((response: HotelReviews []) => {
        response.map(c => c.isShowReviews = false);
        this.hotelReviews = response;
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

  deleteReview(hotelReview: HotelReviews, review: Review) {
    this.sub2 = this.hotelService.deleteReview(review)
      .subscribe((response: any) => {
        this.remove(hotelReview.reviews, review);
        this.showMessage(new Message('success', 'Отзыв успешно удален'));
      });
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
