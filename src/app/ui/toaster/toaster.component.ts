import { Component, OnInit,Input,ElementRef } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-toaster',
  templateUrl: 'toaster.component.html',
  styleUrls: ['toaster.component.css']
})
export class ToasterComponent implements OnInit {
  @Input() cs:any;
  constructor() {}

  ngOnInit() {
  }

}
