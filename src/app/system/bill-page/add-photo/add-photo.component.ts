import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UploadFileService} from '../../../shared/services/upload-file.service';
import {HttpEventType, HttpResponse, HttpClient} from '@angular/common/http';
import {Room} from '../../shared/models/room.model';

@Component({
  selector: 'wfm-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {

  @Output('onAddPhoto') photoEmitter = new EventEmitter<String>();

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
}

