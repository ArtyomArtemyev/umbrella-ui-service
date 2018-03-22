import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'wfm-result-panel',
  templateUrl: './result-panel.component.html',
  styleUrls: ['./result-panel.component.scss']
})
export class ResultPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      const panels = $('.user-infos');
      const panelsButton = $('.dropdown-user');
      panels.hide();

      // Click dropdown
      panelsButton.click(function() {
        // get data-for attribute
        const dataFor = $(this).attr('data-for');
        const idFor = $(dataFor);

        // current button
        const currentButton = $(this);
        idFor.slideToggle(400, function() {
          // Completed slidetoggle
          if (idFor.is(':visible')) {
            currentButton.html('<i class="icon-chevron-up text-muted"></i>');
          } else {
            currentButton.html('<i class="icon-chevron-down text-muted"></i>');
          }
        });
      });


      $('[data-toggle="tooltip"]').tooltip();

      $('button').click(function(e) {
        e.preventDefault();
        alert('This is a demo.\n :-)');
      });
    });
  }

}
