import { Component, OnInit,Input,ElementRef } from '@angular/core';
@Component({
  // moduleId: module.id,
  selector: 'app-footercommon',
  templateUrl: 'footercommon.component.html',
  styleUrls: ['footercommon.component.css'],
  providers : []
})
export class FootercommonComponent implements OnInit {
  @Input() cs : any;
  constructor(
    private el : ElementRef
  ) {}

  ngOnInit() {
    this.self().fn("init");
  }

  self(){
    var cs = this.cs;
    /////////////////
    cs.fn("init",function(){
      ///anyt calls go here
    });
    //get all common json
    cs.fn("onHttp", {
      url: cs.fn("local", "urls").mostviewed,
      body: {},
      callback: function (param: any) {
        // console.log(param.json);
        cs.fn("mostViewed", param.json.mostViewed);
      }
    });
    ///////////////
    return cs;
  }

}
