import { Injectable } from '@angular/core';
import { Form, FormBuilder,Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
@Injectable()
export class CommonService {
  constructor(
    private http: Http
  ) {
    'use strict';
    ////////////////////
    //print
    this.fn("print", function () {
      console.log(this);
      return this;
    })
    ////////////////////
    //isCall
    this.fn("isCall", function (param) {
      if (typeof param.call === "function") {
        param.call(param.data);
      }
    });
    ////////////////////
    //hash click control
    this.fn("hashclick",function(refer: any) {
        let target = document.getElementById(refer);
        let start = document.body.scrollTop;
        let end = target.offsetTop;
        let dist = Math.max(start, end) - Math.min(start, end);
        let speed = Math.min(20, dist / 100);
        let step = Math.round(dist / 25);
        let isBSide = (Math.min(start, end) == start);
        let ahead = (isBSide) ? start + step : start - step;
        let timer = 0;
        let _this = this;
        let noscroll = (start != end);
        if (noscroll) {
            if (isBSide) {
                document.body.scrollTop = end - Math.min(dist, 200);
                start = document.body.scrollTop;
                dist = Math.max(start, end) - Math.min(start, end);
                speed = Math.min(20, dist / (dist / 2));
                timer = 0;
                for (let i = start; i < end; i++) {
                    setTimeout(function () {
                        clearTimeout(this);
                        document.body.scrollTop = Math.round(i);
                    }, timer * speed);
                    timer++;
                }
            } else {
                document.body.scrollTop = end + Math.min(dist, 200);
                start = document.body.scrollTop;
                dist = Math.max(start, end) - Math.min(start, end);
                speed = Math.min(20, dist / (dist / 2));
                timer = 0;
                for (let i = start; i > end; i--) {
                    setTimeout(function () {
                        clearTimeout(this);
                        document.body.scrollTop = Math.round(i);
                    }, timer * speed);
                    timer++;
                }
            }
        }
        return false;
    })
    ////////////////////
    //form validate and submit, reset...
    this.fn("formValidate", function (src: any) {
      var fn = src._this;
      var isNotError = false;
      for (var i in src.form.controls) {
        var iobj = src.form.controls[i];
        isNotError = fn.formBlurValidate(src, i);
        // console.log(isNotError);
        if (isNotError) {
          if (String(isNotError["errfor"]).match(/required/) || String(iobj.value).match(/^(\s{0,})$/) == null) {
            break;
          }
        }
      }
      src.formError = (isNotError) ? src.formError : false;
      return src.formError;
    })
    ////////////////////
    //form blur validate
    this.fn("formBlurValidate", function (src, field) {
      var iobj = src.form.controls[field],
        triggerValidation = false;
      // console.log(iobj.errors);
      if (iobj.errors) {
        triggerValidation = src.formsubmit;
        if (triggerValidation) {
          src.formError = iobj.errors;
          src.formError.msg = (String(src.errorMsg[field][iobj.errors.errfor]).match(/^$|undefined/)) ? src.formError.msg : src.errorMsg[field][iobj.errors.errfor];
          this.makeToaster({
            "theme": "error",
            "msg": src.formError.msg,
            stay: 5000
          });
        }
      }
      return (iobj.errors) ? src.formError : false;
    })
    ////////////////////
    //form blur
    this.fn("formBlur", function (src: any, field: any) {
      src.formsubmit = true;
      src.formError = src._this.formBlurValidate(src, field);
      // console.log(src.formError);
    })
    ////////////////////
    //form submit
    this.fn("formSubmit", function (event, src) {
      src.formsubmit = true;
      src.validate(src);
      if (typeof src._this[src.name + "Submit"] === "function") {
        src._this[src.name + "Submit"](event, src);
      }
      event.preventDefault();
    })
    ////////////////////
    //form reset
    this.fn("formReset", function (src) {
      for (let name in src.form.controls) {
        src.form.controls[name].updateValue('');
        src.form.controls[name].setErrors(null);
      }
      src.formsubmit = false;
    })
    ////////////////////
    //form setInputKeyup
    this.fn("setInputKeyup", function (src, key, value) {
      src[key] = value;
    })
    ////////////////////
    //form bind control
    this.fn("bindControl", function (event, name, form) {
      if (String(event.target.attributes.type.value).match(/checkbox/ig)) {
        form.controls[name].updateValue((event.target.checked) ? '' : event.target.value);
      } else {
        form.controls[name].updateValue(event.target.value);
      }
    })
    ////////////////////
    //runfn
    this.fn("runfn", function (name, param: any = null) {
      this.fn("isCall", {
        call: this[name],
        data: param
      });
    });
    ////////////////////
    //local data
    this.fn("local", function (key: string = "") {
      var _local = {
        "root": {
          "bgroot": "../../assets/images/background/",
          "captcha": "../../assets/images/captcha/"
        },
        urls: {
          "common": commonjson,
          "testimonials": testimonialsjson,
          "mostviewed": mostViewedJson,
          "footerlinks": footerLinksJson,
          "captcha" : captchaJson
        }
      };
      return (_local[key]) ? _local[key] : _local;
    });
    ////////////////////
    //http request
    this.fn("onHttp", function (param) {
      const response = Promise.resolve(param.url);
      response.then(
        json => param.json = json.data
      ).then(() => {
        this.fn(param.callback, param);
      })
    });
    ////////////////////
    //toaster control
    this.fn("g", {
      toaster: {
        "theme": {
          "theme": "like-theme",
          "secondary": "like-secondary",
          "white": "like-white",
          "error": "like-error"
        },
        "default": "topright",
        "show": "error-in",
        "class": "",
        "msg": "",
        "delay" : 5000
      },
      loader: {
        show: false
      }
    });
    ////////////////////
    //toaster close
    this.fn("toasterClose", function () {
      var toaster = this.g.toaster;
      toaster.class = toaster.msg = toaster.timestamp = "";
    })
    ////////////////////
    //make toaster
    this.fn("makeToaster", function (param) {
      var toaster = this.g.toaster, timestamp = new Date().getTime();
      toaster.class = toaster.show + " " + toaster.theme[param.theme] + " ";
      toaster.stay = param.stay || toaster.stay;
      toaster.msg = param.msg;
      toaster.timestamp = timestamp;
      toaster.again = function (ts) {
        if (ts == timestamp) {
          toaster.msg = toaster.class = toaster.timestamp = "";
          if (typeof param.callback === "function") {
            param.callback(param);
          }
        } else {
          setTimeout(() => toaster.again(timestamp), param.stay || toaster.stay);
        }
      }
      setTimeout(() => toaster.again(timestamp), param.stay || toaster.stay);
    });
    ////////////////////
    //loader control
    this.fn("makeLoader", function (param) {
      var loader = this.g.loader;
      loader.show = param.show;
    });
    ////////////////////
    //usercontrol
    this.fn("isAuthUser", function () {
      return this.app.logger.logged;
    })
    ////////////////////
    //notify
    this.fn("notify",function(param) {
        var _this = this;
        var ns = {
            title: "",
            header: false,
            theme: "secondary",
            sizes: "mini",
            modalData: {
                msg: "",
                html: false,
                click: function (event, target, src) {
                    _this.isCall(param.callback, { param: param, src: src, target: target });
                    if (!param.stay) {
                        _this.modalOpen({
                            name: src.name,
                            show: false
                        });
                    }
                },
                action: null
            },
            name: "notificationModal",
            show: true
        }, automate = {
            ok: function () {
                var btn = Object.assign({
                    gridclass: "grid12-xs",
                    label: "Okay",
                    key: "ok",
                    class: "secondary medium"
                }, param.ok || {});
                ns.modalData.action = [btn];
                automate.headerset();
                _this.modalOpen(ns);
            },
            yesno: function () {
                var yes = Object.assign({
                    gridclass: "grid6-xs",
                    label: "Yes",
                    key: "yes",
                    class: "secondary medium"
                }, param.yes || {}), no = Object.assign({
                    gridclass: "grid6-xs",
                    label: "No",
                    key: "no",
                    class: "secondary medium"
                }, param.yes || {});
                ns.modalData.action = [yes, no];
                automate.headerset();
                _this.modalOpen(ns);
            },
            yesnocancel: function () {
                var yes = Object.assign({
                    gridclass: "grid4-xs",
                    label: "Yes",
                    key: "yes",
                    class: "secondary medium"
                }, param.yes || {}), no = Object.assign({
                    gridclass: "grid4-xs",
                    label: "No",
                    key: "no",
                    class: "secondary medium"
                }, param.yes || {}), cancel = Object.assign({
                    gridclass: "grid4-xs",
                    label: "Cancel",
                    key: "cancel",
                    class: "secondary medium"
                }, param.yes || {});
                ns.modalData.action = [yes, no];
                automate.headerset();
                _this.modalOpen(ns);
            }, headerset: function () {
                ns.modalData = Object.assign(ns.modalData, {
                    msg: param.msg || "",
                    html: param.html || false
                });
                ns.theme = param.theme || ns.theme, ns.sizes = param.sizes || ns.sizes, ns.header = param.header || ns.header;
                ns.title = param.title || ns.title;
            }
        }
        setTimeout(() => {
            _this.isCall(automate[param.type], {});
        }, param.delay || 0);
    })
    ////////////////////
    //slides
    this.fn("slides", function (_props, _setting) {
      var self: any;
      if (_props.slides) {
        self = _props.slides;
        if (!_props.hover)
          self.doAgain().print();
      } else {

        _setting.delay = (_setting.delay || 5000) + Math.random() * _setting.random;
        _props.slides = this.fn("fnSlides", _props, _setting);
      }
      return "slides-" + _props.slides.count;
    });
    ////////////////////
    //slides core
    this.fn("fnSlides", function (props, setting) {
      var fn = Object();
      fn.props = props;
      fn.list = fn.props.list, fn.setting = setting;
      fn.getActiveItem = function () {
        var cnt = 0, selected = 0;
        for (var i in this.list) {
          if (this.list[i].selected) {
            break;
          } else {
            selected++;
          }
          cnt++;
        }
        if (selected == this.list.length) {
          this.list[0].selected = true;
          cnt = 0;
        }
        return cnt;
      }
      fn.count = fn.getActiveItem();
      fn.current = fn.list[fn.count];
      fn.next = function () {
        this.count++;
        this.current.selected = false;
        this.current = this.list[this.count % this.list.length];
        this.current.selected = true;
        this.list[this.count % this.list.length].current = this.count % this.list.length;
        return this;
      }
      fn.doAgain = function () {
        var _fn = this;
        var currtimer = new Date().getTime();
        _fn.timer = _fn.timer || new Date().getTime() + _fn.setting.delay;
        // console.log(currtimer, _fn.timer);
        if (_fn.timer < currtimer) {
          _fn.next();
          _fn.timer = currtimer + _fn.setting.delay;
          // console.log(_fn.timer);
        }
        return this;
      }
      fn.init = function () {
        return this;
      }
      fn.print = function () {
        // console.log(this.current);
        return new Date().getTime();
      }
      return fn;
    });
    ///////////////////
    //body scroll disable and enable control
    this.fn("body scroll of",function(toggle){
      document.body.classList[(toggle)?'add':'remove']('overflow-hidden');
    });
  }
  //constructor end
  ////////////////////
  //core function
  fn(a, b: any = {}) {
    var fn = this;
    if (fn[a]) {
      if (typeof fn[a] === "function") {
        var d = Array.prototype.slice.call(arguments);
        d = d.slice(1, d.length);
        var e = fn[a].apply(this, d);
        return e;
      } else {
        fn[a] = b;
        return fn[a];
      }
    } else {
      if (typeof a === "string") {
        fn[a] = b;
        return fn[a];
      }
      if (typeof a === "function") {
        var d = Array.prototype.slice.call(arguments);
        d = d.slice(1, d.length);
        var e = a.apply(this, d);
        return e;
      }
    }
    return fn;
  }
  ////////////////////
}

const commonjson = {
  "data": {
    "name": "Directowners.com",
    "formField": {
      "choosetype": {
        "label": "Chooste Type",
        "type": "radio",
        "fields": [
          {
            "value": "Rent",
            "label": "Rent",
            "name": "p_type",
            "id": "p_type_0",
            "title": "Choose Rent",
            "checked": true,
            "type": "radio"
          },
          {
            "value": "Sale",
            "label": "Sale",
            "name": "p_type",
            "id": "p_type_0",
            "title": "Choose Sale",
            "checked": false,
            "type": "radio"
          }
        ]
      },
      "choosefor": {
        "label": "Choose Property For",
        "type": "radio",
        "fields": [
          {
            "value": "Residential",
            "label": "Residential",
            "name": "p_for",
            "id": "p_for_0",
            "title": "Choose Residential",
            "checked": "checked",
            "type": "radio"
          },
          {
            "value": "Commercial",
            "label": "Commercial",
            "name": "p_for",
            "id": "p_for_1",
            "title": "Choose Commercial",
            "checked": "",
            "type": "radio"
          },
          {
            "value": "Land",
            "label": "Land",
            "name": "p_for",
            "id": "p_for_2",
            "title": "Choose Land",
            "checked": "",
            "type": "radio"
          }
        ]
      },
      "category": {
        "fields": [
          {
            "value": "Individual House",
            "selected": true
          },
          {
            "value": "Apartments",
            "selected": false
          },
          {
            "value": "Villa",
            "selected": false
          },
          {
            "value": "Others",
            "selected": false
          },
          {
            "value": "All",
            "selected": false
          }
        ]
      },
      "bhk": {
        "fields": [
          {
            "value": "1 BHK",
            "selected": true
          },
          {
            "value": "2 BHK",
            "selected": false
          },
          {
            "value": "3 BHK",
            "selected": false
          },
          {
            "value": "3 Above",
            "selected": false
          }
        ]
      },
      "furnish": {
        "fields": [
          {
            "value": "Unfurnished",
            "selected": false
          },
          {
            "value": "Furnished",
            "selected": false
          },
          {
            "value": "Semi Furnished",
            "selected": false
          }
        ]
      },
      "bathroom": {
        "fields": {
          "range": 1,
          "max": 5,
          "min": 1
        }
      },
      "bathtype": {
        "fields": [
          {
            "value": "Western",
            "selected": false
          },
          {
            "value": "Regular",
            "selected": false
          },
          {
            "value": "Any Type",
            "selected": false
          }
        ]
      },
      "familytype": {
        "fields": [
          {
            "value": "Family",
            "selected": false
          },
          {
            "value": "Bachelor",
            "selected": false
          },
          {
            "value": "Any Type",
            "selected": false
          }
        ]
      },
      "facing": {
        "fields": [
          {
            "value": "North",
            "selected": false
          },
          {
            "value": "East",
            "selected": false
          },
          {
            "value": "West",
            "selected": false
          },
          {
            "value": "South",
            "selected": false
          },
          {
            "value": "Any",
            "selected": "selected"
          }
        ]
      },
      "parking": {
        "fields": [
          {
            "id": 0,
            "value": "Car",
            "selected": false
          },
          {
            "id": 1,
            "value": "Bike",
            "selected": false
          },
          {
            "id": 2,
            "value": "Any",
            "selected": false
          }
        ]
      },
      "area": {
        "fields": {
          "min": "0",
          "max": "10000",
          "start": "",
          "end": ""
        }
      },
      "location": {
        "label": "Enter Location",
        "type": "autosuggest",
        "fields": []
      },
      "budget": {
        "label": "Enter Budget",
        "type": "inputminmax",
        "fields": []
      },
      "paymentgateway": {
        "fields": [
          {
            "value": "Payumoney",
            "label": "<span class='pay-you-money rb-icon'><img src='assets/images/figure/payumoney.jpg' alt='Payumoney' /></span>",
            "name": "pg",
            "id": "pg_0",
            "title": "Pay u money gateway",
            "checked": "checked",
            "type": "radio"
          },
          {
            "value": "EBS",
            "label": "<span class='ebs  rb-icon'><img src='assets/images/figure/ebs.jpg' alt='Payumoney' /></span>",
            "name": "pg",
            "id": "pg_1",
            "title": "EBS gateway",
            "type": "radio"
          }
        ]
      }
    },
    "suggestLocation": [
      {
        "value": "Anna Nagar",
        "selected": true
      },
      {
        "value": "Abhirami puram",
        "selected": true
      },
      {
        "value": "Vadapalani"
      },
      {
        "value": "Arumbakkam"
      },
      {
        "value": "Mylapore"
      },
      {
        "value": "Alwarpet"
      },
      {
        "value": "K K Nagar"
      }
    ],
    "budgetField": {
      "control": false,
      "addition": 5000,
      "maxBudget": {
        "amount": ""
      }
    },
    "last24Hrs": {
      "inProp": 256,
      "inArray": [
        "2",
        "5",
        "6"
      ],
      "outProp": 125,
      "outArray": [
        "1",
        "2",
        "5"
      ]
    },
    "cityList": [
      {
        "value": "Chennai",
        "selected": true
      }
    ],
    "sortByList": {
      "selected": "Relevance",
      "fields": [
        {
          "value": "Relevance",
          "url": "/property/relevance",
          "selected": true,
          "sort": null
        },
        {
          "value": "Price Low",
          "url": "/property/price-low",
          "sort": {
            "key": "price", "order": 1
          }
        },
        {
          "value": "Price High",
          "url": "/property/price-high",
          "sort": {
            "key": "price", "order": -1
          }
        },
        {
          "value": "Latest",
          "url": "/property/latest",
          "sort": {
            "key": "updated-date", "order": -1
          }
        }
      ]
    },
    "viewByList": {
      "selected": "List",
      "fields": [
        {
          "value": "List",
          "url": "/property/list",
          "selected": true
        },
        {
          "value": "Grid",
          "url": "/property/grid"
        },
        {
          "value": "Map",
          "url": "/property/map"
        }
      ]
    },
    "utilityBarItem": {
      "common": [
        {
          "responsive": "",
          "url": "",
          "icon": "fa fa-building-o",
          "text": "156845 Property from Direct Owners",
          "islink": false
        },
        {
          "responsive": "",
          "url": "/home",
          "icon": "fa fa-gift",
          "text": "Refer & Win a Gift Coupon",
          "islink": true
        }
      ]
    },
    "asidebar": {
      "common": [
        {
          "title": "Other Property Type",
          "key": "otherpropertytype",
          "items": [
            {
              "id": "0",
              "title": "1 BHK Apartments",
              "location": "Anna Nagar, Chennai",
              "photo": "apartments-1.jpg",
              "selected": true,
              "url": "/property/chennai/anna-nagar/rent/residentials/apartments/"
            },
            {
              "id": "1",
              "title": "1 BHK Apartments",
              "location": "Anna Nagar (West), Chennai",
              "photo": "apartments-2.jpg",
              "url": "/property/chennai/anna-nagar/rent/residentials/apartments/"
            }
          ]
        },
        {
          "title": "Near by locations",
          "key": "nearbylocations",
          "items": [
            {
              "id": "0",
              "title": "1 BHK Residentials",
              "location": "Mugappair, Chennai",
              "photo": "residentials-house-1.jpg",
              "selected": true,
              "url": "/property/chennai/mugappair/rent/residentials/individual-house/"
            },
            {
              "id": "1",
              "title": "1 BHK Residentials",
              "location": "Nelson manickam road, Chennai",
              "photo": "residentials-house-2.jpg",
              "url": "/property/chennai/mogappair/rent/residentials/individual-house/"
            }
          ]
        },
        {
          "title": "Other Locations",
          "key": "otherlocations",
          "items": [
            {
              "id": "0",
              "title": "1 BHK Residentials",
              "location": "Mylapore, Chennai",
              "photo": "individual-house-1.jpg",
              "selected": true,
              "url": "/property/chennai/mylapore/rent/residentials/individual-house/"
            },
            {
              "id": "1",
              "title": "1 BHK Residentials",
              "location": "Koyembedu, Chennai",
              "photo": "individual-house-2.jpg",
              "url": "/property/chennai/koyembedu/rent/residentials/individual-house/"
            }
          ]
        }
      ]
    },
    "quickDashboard": {
      "packageName": "Premium Package",
      "list": [{
        "title": "Click here to view matched property",
        "value": "50 prop., matched",
        "url": ""
      }, {
        "title": "Click here to view newly added property",
        "value": "25 Newly added",
        "url": ""
      }, {
        "title": "Click here to view interested property",
        "value": "5 Interested",
        "url": ""
      }, {
        "title": "Click here to view short listed property",
        "value": "10 Short listed",
        "url": ""
      }]
    }
  }
};

const testimonialsjson = {
  "data": {
    testimonials: {
      list: [
        {
          "id": 0,
          "author": "DO125",
          "location": "Mylapore",
          "shortdesc": "Directowners looks to bridge this gap for all the tenant who are looking for rental properties. More over I very much like their customer support. I strongly recommend directowners to my known circle.",
          "published": "16 May 2016",
          "url": "/testimonials/DO0",
          "ref": "DO0",
        },
        {
          "id": 1,
          "author": "DO132",
          "location": "Anna Nagar",
          "shortdesc": "I have referred my existing property owner to directowners and to my surprise. I have received 100% cashback of my subscription as rewards. I am happy that I rented a flat wihout any payment. Thank you Directowners!",
          "published": "30 March 2016",
          "url": "/testimonials/DO1",
          "ref": "DO1"
        },
        {
          "id": 2,
          "author": "DO165",
          "location": "KK Nagar",
          "shortdesc": "I bought package and I contacted all the 17 owner for testing abd found all property belongs to Real. Genuiue Owners. Really they are doing great.",
          "published": "21 Feb 2016",
          "url": "/testimonials/DO2",
          "ref": "DO2"
        },
        {
          "id": 3,
          "author": "DO193",
          "location": "Ashok Nagar",
          "shortdesc": "I used my property in directowners recently. I received only few call but all are from Tenants only. The best part is that Directowners don't let others to know my contact number and I am happy with privacy. It's good website for owners!",
          "published": "02 Feb 2016",
          "url": "/testimonials/DO3",
          "ref": "DO3"
        },
        {
          "id": 4,
          "author": "DO218",
          "location": "Choolai",
          "shortdesc": "Directowners prevent from unwanted calls and persons",
          "published": "15 Jan 2016",
          "url": "/testimonials/DO4",
          "ref": "DO4"
        }
      ]
    }
  }
};

const mostViewedJson = {
  "data": {
    "mostViewed": {
      "list": [
        {
          "photo": "assets/images/property/300x200/prop1.jpg",
          "title": "Multi storey apartment for rent in chennai",
          "url": "/search/multi-storey-apartment-for-rent"
        },
        {
          "photo": "assets/images/property/300x200/prop2.jpg",
          "title": "Residential apartment for rent in chennai",
          "url": "/search/residential-apartment-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop3.jpg",
          "title": "Individual house for rent in chennai",
          "url": "/search/individual-house-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop4.jpg",
          "title": "Villa for rent in chennai",
          "url": "/search/villa-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop5.jpg",
          "title": "Office space for rent in chennai",
          "url": "/property/office-space-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop6.jpg",
          "title": "Shop for rent in chennai",
          "url": "/search/shop-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop7.jpg",
          "title": "Show room for rent in chennai",
          "url": "/search/show-room-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop1.jpg",
          "title": "Multi storey apartment for rent in chennai",
          "url": "/search/multi-storey-apartment-for-rent"
        },
        {
          "photo": "assets/images/property/300x200/prop2.jpg",
          "title": "Residential apartment for rent in chennai",
          "url": "/search/residential-apartment-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop3.jpg",
          "title": "Individual house for rent in chennai",
          "url": "/search/individual-house-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop4.jpg",
          "title": "Villa for rent in chennai",
          "url": "/search/villa-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop5.jpg",
          "title": "Office space for rent in chennai",
          "url": "/property/office-space-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop6.jpg",
          "title": "Shop for rent in chennai",
          "url": "/search/shop-for-rent-in-chennai"
        },
        {
          "photo": "assets/images/property/300x200/prop7.jpg",
          "title": "Show room for rent in chennai",
          "url": "/search/show-room-for-rent-in-chennai"
        }
      ]
    }
  }
};
const footerLinksJson = {
  "data": {
    "footerLinks": {
      "sitelinks": [
        {
          "url": "/about",
          "title": "About Us",
          "menu": "About Us"
        },
        {
          "url": "/terms-and-conditions",
          "title": "Terms & Conditions",
          "menu": "Terms & Conditions"
        },
        {
          "url": "/privacy-and-policy",
          "title": "Privacy",
          "menu": "Privacy"
        },
        {
          "url": "/testimonials",
          "title": "Testimonials",
          "menu": "Testimonials"
        },
        {
          "url": "/faq",
          "title": "FAQ",
          "menu": "FAQ"
        }
      ],
      "subscribers": [
        {
          "url": "javascript:void(0)",
          "title": "Sign Up",
          "menu": "Sign Up",
          "event": "signupModal"
        },
        {
          "url": "javascript:void(0)",
          "title": "Sign In",
          "menu": "Sign In",
          "event": "loginModal"
        }
      ],
      "forpost": [
        {
          "url": "/post-your-property",
          "title": "Post Your Property",
          "menu": "Post Your Property"
        },
        {
          "url": "/post-your-requirement",
          "title": "Post Your Requirement",
          "menu": "Post Requirement"
        }
      ],
      "buyerOwners": [
        {
          "url": "/how-it-works",
          "title": "How its works?",
          "menu": "How its works?"
        },
        {
          "url": "/why-should-i-pay",
          "title": "Why Should I, Pay?",
          "menu": "Why Should I, Pay?"
        },
        {
          "url": "javascript:void(0);",
          "title": "Refer a Friend",
          "menu": "Refer a Friend",
          "event": "referAFriendModal"
        },
        {
          "url": "javascript:void(0);",
          "title": "Refer a Owner",
          "menu": "Refer a Owner",
          "event": "referAOwnerModal"
        }
      ],
      "explore": [
        {
          "url": "/news",
          "title": "News",
          "menu": "News"
        },
        {
          "url": "/offers",
          "title": "Offers",
          "menu": "Offers"
        },
        {
          "url": "/claim-gift-voucher",
          "title": "Claim Gift Voucher",
          "menu": "Claim Gift Voucher"
        }
      ],
      "socials": [
        {
          "url": "http://www.facebook.com/directowners/",
          "title": "Facebook",
          "menu": "Facebook",
          "icon": "fa-facebook"
        },
        {
          "url": "https://twitter.com/thedirectowners",
          "title": "Twitter",
          "menu": "Twitter",
          "icon": "fa-twitter"
        },
        {
          "url": "https://www.linkedin.com/company/directowners",
          "title": "LinkedIn",
          "menu": "LinkedIn",
          "icon": "fa-linkedin"
        },
        {
          "url": "https://plus.google.com/+Directowners-infosolutions/posts",
          "title": "Google Plus",
          "menu": "Google Plus",
          "icon": "fa-google-plus"
        },
        {
          "url": "https://www.pinterest.com/directowners",
          "title": "Pinterest",
          "menu": "Pinterest",
          "icon": "fa-pinterest"
        }
      ]
    }
  }
}

const captchaJson = {
    "data" : {
        captcha :{
            "value" : "whk7r" 
        }
    }
}