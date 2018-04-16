import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Order} from '../models/order.model';
import {Token} from '../models/token.model';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../system/shared/models/hotel.model';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }

  createOrder(order: Order, token: Token): Observable<Order> {
    return this.http.post('http://localhost:9094/api/v1/orders', order)
      .map((response: Response) => response.json());
  }

  getUserOrder(token: Token): Observable<Order[]> {
    return this.http.post('http://localhost:9094/api/v1/orders/user', token)
      .map((response: Response) => response.json());
  }

  getAllUserOrders(): Observable<Order[]> {
    return this.http.get('http://localhost:9094/api/v1/orders')
      .map((response: Response) => response.json());
  }

  getAllUnprocessedUserOrders(): Observable<Order[]> {
    return this.http.get('http://localhost:9094/api/v1/orders/unprocessed')
      .map((response: Response) => response.json());
  }

  updateOrder(order: Order, id: number): Observable<any> {
    return this.http.put(`http://localhost:9094/api/v1/orders/${id}`, order);
  }

}
