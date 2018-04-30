import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../shared/models/message.models';
import {NgForm} from '@angular/forms';
import {TicketService} from '../../shared/services/ticktet.service';
import {Voyage} from '../../shared/models/voyage.model';
import {User} from '../../shared/models/user.model';
import {Ticket} from '../../shared/models/ticket.model';
import {OrderVoyage} from '../../shared/models/order-voyage.model';
import {Token} from '../../shared/models/token.model';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-find-tickets-page',
  templateUrl: './find-tickets-page.component.html',
  styleUrls: ['./find-tickets-page.component.scss']
})
export class FindTicketsPageComponent implements OnInit {
  message: Message;
  isShowMessageBlock: boolean;
  typesOfAirTickets: string [] = [];
  typesOfTrainTickets: string [] = [];
  typeOfTickets: string[];
  @ViewChild('typeOfTranspoartSelector') typeOfTranspoartSelector: ElementRef;
  @ViewChild('typeOfTranspoartTicketSelector') typeOfTranspoartTicketSelector: ElementRef;
  voyageSuggestions: Voyage [] = [];
  user: User;
  showTicket: Ticket = new Ticket(null, null, null);
  date: Date;
  showNoFind: boolean;

  constructor(private ticketService: TicketService, private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.typesOfAirTickets.push('Первый класс');
    this.typesOfAirTickets.push('Бизнес-класс');
    this.typesOfAirTickets.push('Экономический-класс');
    this.typesOfTrainTickets.push('Сидячий');
    this.typesOfTrainTickets.push('Общий');
    this.typesOfTrainTickets.push('Плацкартный');
    this.typesOfTrainTickets.push('Купейный');
    this.typesOfTrainTickets.push('Вагон СВ');
    this.showNoFind = false;
  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }

  setTypeOfTickets() {
    if (this.typeOfTranspoartSelector.nativeElement.value === 'Air') {
      this.typeOfTickets = this.typesOfAirTickets;
    } else {
      this.typeOfTickets = this.typesOfTrainTickets;
    }
  }

  onSubmit(f: NgForm) {
    if (f.value.fromWhenceInput === f.value.whereToInput) {
      this.showMessage(new Message('danger', 'Пункт отправления не может являться пунктом прибытия'));
    } else {
      if (+f.value.countOfTicket <= 0) {
        this.showMessage(new Message('danger', 'Количество билетов не может быть меньше или равно нулю'));
      } else {
        this.date = f.value.dateOfVoyage;
        const findTicket = new FindTicketModel(this.typeOfTranspoartSelector.nativeElement.value, f.value.fromWhenceInput, f.value.whereToInput, f.value.dateOfVoyage, +f.value.countOfTicket);
        this.ticketService.getTicketsForVoyuage(findTicket)
          .subscribe((response: Voyage []) => {
            if (response.length === 0) {
              this.showNoFind = true;
            } else {
              for (let i = 0; i < response.length; i++) {
                response[i].isShowSuggestion = false;
              }
              this.voyageSuggestions = response;
            }
          });
      }
    }
  }

  setShowTicket(ticketSuggestion: Ticket) {
    this.showTicket = ticketSuggestion;
  }


  addOrderVoyage(voyageSuggestion: Voyage, showTicket: Ticket, value: string, value2: string, value3: string) {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    const newOrderVoyage = new OrderVoyage(this.user, showTicket, voyageSuggestion, this.date, value, value2, +value3, token);
    this.ticketService.createOrderVoyage(newOrderVoyage).subscribe((response: any) => {
      this.showMessage(new Message('success', 'Успешное оформление заявки на бронирование билета'));
      this.router.navigate(['/system-user', 'my-tickets']);
    });
  }
}

class FindTicketModel {
  constructor(
    public typeOfTransport: string,
    public fromWhence: string,
    public whereTo: string,
    public dateOfVoyage: Date,
    public countOfTicket: number
  ) {
  }
}
