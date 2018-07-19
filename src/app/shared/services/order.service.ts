import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Order} from '../models/order.model';
import {Token} from '../models/token.model';
import {Observable} from 'rxjs/Observable';
import {BaseApi} from '../core/base-api';

@Injectable()
export class OrderService extends BaseApi {

  constructor(public http: Http) {
    super(http, 'http://localhost:9094/api/v1/');
  }

  createOrder(order: Order, token: Token): Observable<Order> {
    return this.post('orders', order);
  }

  getUserOrder(token: Token): Observable<Order[]> {
    return this.post('orders/user', token);
  }

  getAllUserOrders(): Observable<Order[]> {
    return this.get('orders');
  }

  getAllUnprocessedUserOrders(): Observable<Order[]> {
    return this.get('orders/unprocessed');
  }

  updateOrder(order: Order, id: number): Observable<any> {
    return this.http.put(`http://localhost:9094/api/v1/orders/${id}`, order);
  }

  getOrderById(id: string): Observable<Order []> {
    return this.http.get(`http://localhost:9094/api/v1/orders/${id}`)
      .map((response: Response) => response.json());
  }

}
