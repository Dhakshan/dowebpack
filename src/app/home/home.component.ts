import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'

import { CommonService, FormvalidateService, ModalService } from "../shared";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['../../assets/css/home.css'],
  providers: [CommonService, FormvalidateService,ModalService,FormBuilder]
})
export class HomeComponent {
  constructor(
    private cs: CommonService,
    private fv: FormvalidateService,
    private modal : ModalService,
    private http : Http,
    private fb : FormBuilder
  ) {
  }
  ngOnInit() {
    this.self();
    this.cs.fn("init");
  }
  self() {
    var cs = this.cs;
    var fv = this.fv;
    ///////////////
    //init
    cs.fn("init", function () {
      cs.fn('last 24 in update', cs);
      cs.fn('last 24 out update', cs);
    })
    //modal assign to cs
    cs.fn("modal",this.modal);
    //search button toggle
    cs.fn("searchToggle", false);
    //get all common json
    cs.fn("onHttp", {
      url: cs.fn("local", "urls").common,
      body: {},
      callback: function (param: any) {
        cs.fn("app", param.json);
      }
    });
    ///////////////
    //get all testimonials json
    cs.fn("onHttp", {
      url: cs.fn("local", "urls").testimonials,
      body: {},
      callback: function (param: any) {
        cs.fn("testimonials", param.json.testimonials);
      }
    });
    ///////////////
    //in update control
    cs.fn("last 24 in update", function (response) {
      setTimeout(() => {
        response.app.last24Hrs.inProp += 1;
        response.app.last24Hrs.inArray = String(response.app.last24Hrs.inProp).split("");
        cs.fn("last 24 in update", response);
      }, Math.random() * 5000);
    });
    ///////////////
    //out update control
    cs.fn("last 24 out update", function (response) {
      setTimeout(() => {
        response.app.last24Hrs.outProp += 1;
        response.app.last24Hrs.outArray = String(response.app.last24Hrs.outProp).split("");
        cs.fn("last 24 out update", response);
      }, Math.random() * 5000);
    });
    ///////////////
    //header scroll color changes 
    cs.fn("headerClass", "");
    cs.fn("headerScroll", function () {
      var wintop = window.scrollY, hcolors = document.querySelectorAll("[data-hcolor]");
      for (var i = 0; i < hcolors.length; i++) {
        var iobj = hcolors.item(i), gb = iobj.getBoundingClientRect();
        var iobjY = wintop + gb.top, hcolor;
        if (iobjY < wintop) {
          hcolor = iobj.getAttribute("data-hcolor");
          cs.fn("headerClass", hcolor);
          cs.fn("searchToggle", true);
        }
        if (!wintop) {
          cs.fn("searchToggle", false),
            cs.fn("headerClass", "");
        }
      }
    });
    //home search form
    cs.fn("homeform", {
      _this: cs,
      name: "homeform",
      form: this.fb.group({
        propFor: this.fb.control("", Validators.compose([fv.isRequired])),
        propType: this.fb.control("", Validators.compose([fv.isRequired])),
        propLocation: this.fb.control("", Validators.compose([fv.isRequired])),
        budget: this.fb.control("", Validators.compose([fv.isRequired]))
      }),
      formBlur: cs["formBlur"],
      formError: false,
      formSuccess: {
        msg: "Search success"
      },
      validate: cs["formValidate"],
      errorMsg: {
        propFor: {
          "required": "Please choose property for."
        },
        propType: {
          "required": "Please choose property type."
        },
        propCategory: {
          "required": "Please choose property category."
        },
        propLocation: {
          "required": "Please enter location"
        },
        budget: {
          "required": "Please enter budget."
        },
      },
      submit: cs["formSubmit"]
    });
    cs.fn("homeformSubmit", function (event,src) {
        src.formsubmit = true;
        if (src.formError) {
            cs["makeToaster"]({
                theme: "error",
                "msg": src.formError.msg,
                stay: 3000
            });
        } else {
          console.log(cs);
          cs["makeToaster"]({
                theme: "white",
                "msg": "Success",
                stay: 3000
            });
            // console.log(src);
            // var redirectTo = ["property","chennai",formData.propFor.value,formData.propType.value];
            // src._this.router.navigate(redirectTo);
        }
    });
    ///////////////
    //float search control
    cs.fn("isLocationHidden",false);
    cs.fn("isSearchHidden",false);
    cs.fn("flyoutToggleBtnClick",function(event: any, refer: any) {
        cs[refer] = !cs[refer];
        cs[(refer == "isLocationHidden") ? "isSearchHidden" : "isLocationHidden"] = false;
        console.log(cs[refer]);
    });
    cs.fn("showFlyout",function(refer: any) {
        return (cs[refer]) ? "flyout-o" : "";
    });
    ///////////////

    return cs;
  }
}
