import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../system/shared/models/hotel.model';
import {FindHotel} from '../../system/shared/models/find-hotel.model';

@Injectable()
export class HotelsService {

  constructor(private http: Http) {}

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

  findHotel(findHotelObject: FindHotel): Observable<any> {
    return this.http.post('http://localhost:9094/api/v1/hotels/find-hotel', findHotelObject);
  }

}
