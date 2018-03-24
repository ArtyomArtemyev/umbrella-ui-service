import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../../shared/services/upload-file.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'wfm-main-information-card',
  templateUrl: './main-information-card.component.html',
  styleUrls: ['./main-information-card.component.scss']
})
export class MainInformationCardComponent implements OnInit {
  @Output('onAddPhoto') photoEmitter = new EventEmitter<String>();
  @Output('onAddMainInformation') informationEmitter = new EventEmitter<{name: string, city: string, address: string, countOfStars: number, description: string}>();

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  fileName: string;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
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
        console.log(this.fileName);
        this.photoEmitter.emit(this.fileName);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }

  onSubmit(form: NgForm) {
    let {addressInput, cityInput, countOfStarsInput, descriptionInput, nameInput} = form.value;
    this.informationEmitter.emit({name: nameInput, city: cityInput, address: addressInput, countOfStars: +countOfStarsInput, description: descriptionInput});
  }
}
