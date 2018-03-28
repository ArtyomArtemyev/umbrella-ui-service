import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Hotel} from '../shared/models/hotel.model';
import {HotelsService} from '../../shared/services/hotels.service';
import {UploadFileService} from '../../shared/services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'wfm-hotels-page',
  templateUrl: './hotels-page.component.html',
  styleUrls: ['./hotels-page.component.scss']
})
export class HotelsPageComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  hotels: Hotel [] = [];
  progress: { percentage: number } = {percentage: 0};
  fileName: string;
  newFileName: string;
  isShowMessageAboutEditBlock: boolean;

  constructor(private hotelService: HotelsService, private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.isShowMessageAboutEditBlock = false;
    this.hotelService.getHotels()
      .subscribe((responseHotels: Hotel []) => {
       for (let i = 0; i < responseHotels.length; i++) {
         responseHotels[i].isShownAddInformation = false;
         responseHotels[i].isShownRooms = false;
         responseHotels[i].isDeleteHotelButtonDisabled = false;
         responseHotels[i].isRoomButtonDisabled = false;
         responseHotels[i].isEditHotelButtonDisabled = false;
       }
       this.hotels = responseHotels;
       console.log(this.hotels);
      });
  }

  deleteHotel(hotel: Hotel) {
    this.hotelService.deleteHotel(hotel)
      .subscribe((response: any) => {
        this.remove(this.hotels, hotel);
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
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
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
    this.hotelService.updateHotel(hotel, hotel.id)
      .subscribe((response: any) => {
        hotel.isShownAddInformation = false;
        this.showEditMessageBlock();
      });
  }

  showEditMessageBlock() {
    this.isShowMessageAboutEditBlock = true;
    window.setTimeout(() => {
      this.isShowMessageAboutEditBlock = false;
    }, 1000);
  }
}
