import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Voyage} from '../models/voyage.model';
import {OrderVoyage} from '../models/order-voyage.model';
import {Token} from '../models/token.model';

@Injectable()
export class TicketService {
  constructor(private http: Http) {
  }

  getTicketsForVoyuage(voyauge: any): Observable<Voyage []> {
    return this.http.post('http://localhost:9096/api/v1/voyages/find', voyauge)
      .map((response: Response) => response.json());
  }

  createOrderVoyage(newOrderVoyage: OrderVoyage): Observable<any> {
    return this.http.post('http://localhost:9096/api/v1/voyages/order-voyage', newOrderVoyage)
      .map((response: Response) => response.json());
  }

  findOrderVoyagesForUser(token: Token): Observable<OrderVoyage []> {
    return this.http.post('http://localhost:9096/api/v1/voyages/by-user', token)
      .map((response: Response) => response.json());
  }

  getAllOrderVoyage(): Observable<OrderVoyage []> {
    return this.http.get('http://localhost:9096/api/v1/voyages')
      .map((response: Response) => response.json());
  }

  changeStatus(orderVoyage: OrderVoyage) {
    return this.http.put(`http://localhost:9096/api/v1/voyages/${orderVoyage.id}/done`, orderVoyage)
      .map((response: Response) => response.json());
  }

  getTicktetById(value: any): Observable<OrderVoyage []> {
    return this.http.get(`http://localhost:9096/api/v1/voyages/${value}`)
      .map((response: Response) => response.json());
  }
}
