import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wfm-education-page',
  templateUrl: './education-page.component.html',
  styleUrls: ['./education-page.component.scss']
})
export class EducationPageComponent implements OnInit {

  isShow: boolean;
  constructor() { }

  ngOnInit() {
    this.isShow = true;
  }

}
