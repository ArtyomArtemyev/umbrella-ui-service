import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../system/shared/models/hotel.model';
import {FindHotel} from '../../system/shared/models/find-hotel.model';
import {HotelSuggestion} from '../../system-user/shared/models/hotel-suggestion.model';
import {Review} from '../models/review.model';
import {HotelReviews} from '../models/hotel-review.model';

@Injectable()
export class HotelsService {

  constructor(private http: Http) {
  }

  createNewHotel(hotel: Hotel): Observable<any> {
    return this.http.post('http://localhost:9094/api/v1/hotels', hotel);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get('http://localhost:9094/api/v1/hotels')
      .map((response: Response) => response.json());
  }

  deleteHotel(hotel: Hotel): Observable<any> {
    return this.http.delete(`http://localhost:9094/api/v1/hotels/${hotel.id}`);
  }

  updateHotel(hotel: Hotel, id: string): Observable<any> {
    return this.http.put(`http://localhost:9094/api/v1/hotels/${id}`, hotel);
  }

  findHotel(findHotelObject: FindHotel): Observable<HotelSuggestion []> {
    return this.http.post('http://localhost:9094/api/v1/hotels/find-hotel', findHotelObject)
      .map((response: Response) => response.json());
  }

  findHotelsByHotelName(value: string) {
    return this.http.post('http://localhost:9094/api/v1/hotels/find-hotel/by-name', value)
      .map((response: Response) => response.json());
  }

  findHotelsByLocation(value: any) {
    return this.http.post('http://localhost:9094/api/v1/hotels/find-hotel/by-location', value)
      .map((response: Response) => response.json());
  }

  addReview(review: Review) {
    return this.http.post('http://localhost:9094/api/v1/reviews', review)
      .map((response: Response) => response.json());
  }

  getAllReviews(): Observable<HotelReviews []> {
    return this.http.get('http://localhost:9094/api/v1/reviews')
      .map((response: Response) => response.json());

  }

}
