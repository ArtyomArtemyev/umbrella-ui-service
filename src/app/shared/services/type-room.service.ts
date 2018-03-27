import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {DefaultTypeRoom} from '../../system/shared/models/default-type-room.model';

@Injectable()
export class TypeRoomService {

  constructor(private http: Http) {
  }

  getRooms(): Observable<DefaultTypeRoom[]> {
    return this.http.get('http://localhost:9094/api/v1/hotels/type-rooms')
      .map((response: Response) => response.json());
  }

}
