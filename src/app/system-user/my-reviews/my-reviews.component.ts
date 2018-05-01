import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../shared/models/message.models';
import {HotelsService} from '../../shared/services/hotels.service';
import {Review} from '../../shared/models/review.model';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit, OnDestroy {
  reviews: Review [] = [];
  showReviews: Review [] = [];
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
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    this.sub1 = this.hotelService.getUserReviews(token)
      .subscribe((response: Review []) => {
        response.map(c => c.isShowReviews = false);
        this.reviews = response;
        if (+this.reviews.length <= 5) {
          this.endIndex = +this.reviews.length;
          this.showReviews = this.reviews.slice(this.startIndex, this.endIndex);
        } else {
          this.endIndex = 5;
          this.showReviews = this.reviews.slice(this.startIndex, this.endIndex);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  plusPage() {
    if (this.endIndex + 4 > +this.reviews.length) {
      this.startIndex = this.endIndex;
      this.endIndex = +this.reviews.length;
      this.showReviews = this.reviews.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + 5;
      this.showReviews = this.reviews.slice(this.startIndex, this.endIndex);
    }
  }

  minPage() {
    this.endIndex = this.startIndex;
    this.startIndex = this.startIndex - 5;
    this.showReviews = this.reviews.slice(this.startIndex, this.endIndex);
  }

  deleteReview(hotelReview: Review [], review: Review) {
    this.sub2 = this.hotelService.deleteReview(review)
      .subscribe((response: any) => {
        this.remove(this.showReviews, review);
        this.remove(this.reviews, review);
        this.remove(hotelReview, review);
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
