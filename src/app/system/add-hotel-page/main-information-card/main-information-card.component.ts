import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../../shared/services/upload-file.service';
import {NgForm} from '@angular/forms';
import {Message} from '../../../shared/models/message.models';

@Component({
  selector: 'wfm-main-information-card',
  templateUrl: './main-information-card.component.html',
  styleUrls: ['./main-information-card.component.scss']
})
export class MainInformationCardComponent implements OnInit {
  @ViewChild('addMainInformationMessageBlockError') addMainInformationMessageBlockError: ElementRef;

  @Output('onAddPhoto') photoEmitter = new EventEmitter<String>();
  @Output('onAddMainInformation') informationEmitter = new EventEmitter<{ name: string, city: string, address: string, countOfStars: number, description: string }>();

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  fileName: string;
  isPhotoLoaded: boolean;
  isShowNextPage: boolean;
  isShowErorBlock: boolean;
  isShowMessageBlock: boolean;
  message: Message;

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.isShowErorBlock = false;
    this.isPhotoLoaded = false;
    this.isShowNextPage = false;
    this.isShowMessageBlock = false;
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
        this.isPhotoLoaded = true;
        this.isShowErorBlock = false;
        this.photoEmitter.emit(this.fileName);
      } else if (event instanceof HttpResponse) {
      }
    });

    this.selectedFiles = undefined;
  }

  onSubmit(form: NgForm) {
    if (this.isPhotoLoaded) {
      let {addressInput, cityInput, countOfStarsInput, descriptionInput, nameInput} = form.value;
      if (countOfStarsInput < 0 || countOfStarsInput > 5) {
        this.showMessage(new Message('', 'Количество звезд может быть от 0 до 5'));
      } else {
        form.reset();
        this.informationEmitter.emit({
          name: nameInput,
          city: cityInput,
          address: addressInput,
          countOfStars: +countOfStarsInput,
          description: descriptionInput
        });
      }
    } else if (!this.isPhotoLoaded) {
      this.isShowErorBlock = true;
    }
  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }

}

