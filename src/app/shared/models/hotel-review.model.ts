import {Hotel} from '../../system/shared/models/hotel.model';
import {Review} from './review.model';

export class HotelReviews {
  constructor(
    public hotel: Hotel,
    public reviews: Review [],
    public isShowReviews?: boolean
  ) {
  }
}
