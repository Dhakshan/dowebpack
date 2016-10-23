import { Component, OnInit, Input, ElementRef } from '@angular/core';
@Component({
  // moduleId: module.id,
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'],
  providers : []
})
export class FooterComponent implements OnInit {
  @Input() cs : any;
  constructor(
    el : ElementRef
  ) {}

  ngOnInit() {
    this.self().fn("init");
  }

  self(){
    var cs = this.cs;
    /////////////////
    cs.fn("init",function(){
      ///any calls go here
    });
    //modal assign to cs
    // cs.fn("modal",this.modal);
    //get all common json
    cs.fn("onHttp", {
      url: cs.fn("local", "urls").footerlinks,
      body: {},
      callback: function (param: any) {
        cs.fn("footerLinks", param.json.footerLinks);
      }
    });
    ///////////////
    return cs;
  }
}
