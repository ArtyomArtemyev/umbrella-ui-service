import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Hotel} from '../shared/models/hotel.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {UploadFileService} from '../../shared/services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.scss']
})
export class HotelsPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  selectedFiles: FileList;
  currentFileUpload: File;
  hotels: Hotel [] = [];
  showHotels: Hotel [] = [];
  progress: { percentage: number } = {percentage: 0};
  fileName: string;
  newFileName: string;
  isShowMessageAboutEditBlock: boolean;
  searchValue = '';
  searchPlaceholder = 'Название';
  searchField = 'name';
  private startIndex = 0;
  private endIndex = 0;

  constructor(private hotelService: HotelsService, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.isShowMessageAboutEditBlock = false;
    this.sub1 = this.hotelService.getHotels()
      .subscribe((responseHotels: Hotel []) => {
        for (let i = 0; i < responseHotels.length; i++) {
          responseHotels[i].isShownAddInformation = false;
          responseHotels[i].isShownRooms = false;
          responseHotels[i].isDeleteHotelButtonDisabled = false;
          responseHotels[i].isRoomButtonDisabled = false;
          responseHotels[i].isEditHotelButtonDisabled = false;
        }
        this.hotels = responseHotels;
        if (+this.hotels.length <= 5) {
          this.endIndex = +this.hotels.length;
          this.showHotels = this.hotels.slice(this.startIndex, this.endIndex);
        } else {
          this.endIndex = 5;
          this.showHotels = this.hotels.slice(this.startIndex, this.endIndex);
        }
      });
  }

  deleteHotel(hotel: Hotel) {
    this.sub2 = this.hotelService.deleteHotel(hotel)
      .subscribe((response: any) => {
        this.remove(this.hotels, hotel);
        this.remove(this.showHotels, hotel);
      });
  }

  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileName = this.selectedFiles.item(0).name;
    this.sub3 = this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        this.newFileName = this.fileName;
      } else if (event instanceof HttpResponse) {
      }
    });

    this.selectedFiles = undefined;
  }


  updateHotel(hotel: Hotel) {
    console.log(this.newFileName);
    console.log('ip');
    if (this.newFileName !== undefined) {
      if (this.newFileName !== hotel.photoName) {
        hotel.photoName = this.newFileName;
      }
    }
    this.sub4 = this.hotelService.updateHotel(hotel, hotel.id)
      .subscribe((response: any) => {
        hotel.isShownAddInformation = false;
        hotel.isRoomButtonDisabled = !hotel.isRoomButtonDisabled;
        hotel.isDeleteHotelButtonDisabled = !hotel.isDeleteHotelButtonDisabled;
        this.showEditMessageBlock();
      });
  }

  showEditMessageBlock() {
    this.isShowMessageAboutEditBlock = true;
    window.setTimeout(() => {
      this.isShowMessageAboutEditBlock = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub1.unsubscribe();
    }
    if (this.sub3) {
      this.sub1.unsubscribe();
    }
    if (this.sub4) {
      this.sub1.unsubscribe();
    }
  }

  changeCriteria(field: string) {
    const namesMap = {
      name: 'Название',
      city: 'Город',
      address: 'Адрес',
      countOfStars: 'Количество звезд'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

  plusPage() {
    if (this.endIndex + 4 > +this.hotels.length) {
      this.startIndex = this.endIndex;
      this.endIndex = +this.hotels.length;
      this.showHotels = this.hotels.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + 5;
      this.showHotels = this.hotels.slice(this.startIndex, this.endIndex);
    }
  }

  minPage() {
    this.endIndex = this.startIndex;
    this.startIndex = this.startIndex - 5;
    this.showHotels = this.hotels.slice(this.startIndex, this.endIndex);
  }
}
