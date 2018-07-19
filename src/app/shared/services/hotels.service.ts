import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../system/shared/models/hotel.model';
import {FindHotel} from '../../system/shared/models/find-hotel.model';
import {HotelSuggestion} from '../../system-user/shared/models/hotel-suggestion.model';
import {Review} from '../models/review.model';
import {HotelReviews} from '../models/hotel-review.model';
import {Token} from '../models/token.model';
import {BaseApi} from '../core/base-api';

@Injectable()
export class HotelsService extends BaseApi {

  constructor(public http: Http, public baseUrl: string) {
    super(http, 'http://localhost:9094/api/v1/');
  }

  createNewHotel(hotel: Hotel): Observable<any> {
    return this.post('hotels', hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.get('hotels');
  }

  deleteHotel(hotel: Hotel): Observable<any> {
    return this.http.delete(`http://localhost:9094/api/v1/hotels/${hotel.id}`);
  }

  updateHotel(hotel: Hotel, id: string): Observable<any> {
    return this.http.put(`http://localhost:9094/api/v1/hotels/${id}`, hotel);
  }

  findHotel(findHotelObject: FindHotel): Observable<HotelSuggestion []> {
    return this.post('hotels/find-hotel', findHotelObject);
  }

  findHotelsByHotelName(value: string) {
    return this.post('hotels/find-hotel/by-name', value);
  }

  findHotelsByLocation(value: any) {
    return this.post('hotels/find-hotel/by-location', value);
  }

  addReview(review: Review) {
    return this.post('reviews', review);
  }

  getAllReviews(): Observable<HotelReviews []> {
    return this.get('reviews');
  }

  deleteReview(review: Review) {
    return this.http.delete(`http://localhost:9094/api/v1/reviews/${review.id}`);
  }

  getUserReviews(token: Token): Observable<Review []> {
    return this.post('reviews/by-user', token);
  }
}
