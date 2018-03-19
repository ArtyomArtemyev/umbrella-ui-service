import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(private http: Http) {
  }

  checkUserByEmail(email: string): Observable<boolean> {
    return this.http.get(`http://localhost:9092/api/v1/users?email=${email}`)
      .map((response: Response) => response.status === 202);
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:9092/api/v1/users', user)
      .map((response: Response) => response.json());
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`ttp://localhost:9092/api/v1/users?email=${email}`)
      .map((response: Response) => response.json())
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }
}
