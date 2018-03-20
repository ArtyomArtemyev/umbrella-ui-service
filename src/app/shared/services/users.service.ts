import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {

  constructor(private http: Http) {
  }

  createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:9092/api/v1/users', user)
      .map((response: Response) => response.json());
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:9092/api/v1/users/email?email=${email}`)
      .map((response: Response) => response.json())
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    return this.http.get(`http://localhost:9092/api/v1/users/login?email=${email}&password=${password}`)
      .map((response: Response) => response.json())
      .map((user: User[]) => user[0] ? user[0] : undefined);
  }

}
