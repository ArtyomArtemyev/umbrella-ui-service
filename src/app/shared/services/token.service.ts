import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {Token} from '../models/token.model';

@Injectable()
export class TokenService {
  constructor(private http: Http) {
  }

  getToken(user: User): Observable<Token> {
    return this.http.post('http://localhost:9092/api/v1/tokens', user)
      .map((response: Response) => response.json());
  }

}
