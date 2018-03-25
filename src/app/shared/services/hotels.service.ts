import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../system/shared/models/hotel.model';

@Injectable()
export class HotelsService {

  constructor(private http: Http) {}

  createNewHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post('http://localhost:9094/api/v1/hotels', hotel)
      .map((response: Response) => response.json());
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get('http://localhost:9094/api/v1/hotels')
      .map((response: Response) => response.json());
  }

  deleteHotel(hotel: Hotel): Observable<any> {
    return this.http.delete(`http://localhost:9094/api/v1/hotels/${hotel.id}`)
        .map((response: Response) => response.json());
  }

}
