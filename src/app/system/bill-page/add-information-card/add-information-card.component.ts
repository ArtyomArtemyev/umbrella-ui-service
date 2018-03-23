import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'wfm-add-information-card',
  templateUrl: './add-information-card.component.html',
  styleUrls: ['./add-information-card.component.scss']
})
export class AddInformationCardComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('cityInput') cityInput: ElementRef;
  @ViewChild('addressInput') addressInput: ElementRef;
  @ViewChild('countOfStarsInput') countOfStarsInput: ElementRef;
  @ViewChild('descriptionInput') descriptionInput: ElementRef;


  @Output('onAddMainInformation') informationEmitter = new EventEmitter<{name: string, city: string, address: string, countOfStars: number, description: string}>();

  constructor() { }


  addMainInformation() {
    this.informationEmitter.emit({name: this.nameInput.nativeElement.value, city: this.cityInput.nativeElement.value, address: this.addressInput.nativeElement.value, countOfStars: +this.countOfStarsInput.nativeElement.value, description: this.descriptionInput.nativeElement.value});
  }
}
