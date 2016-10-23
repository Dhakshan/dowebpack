import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'app-selectbox',
  templateUrl: 'selectbox.component.html',
  styleUrls: ['selectbox.component.css']
})
export class SelectboxComponent implements OnInit {
  @Input() src: any;
  constructor(
    private _el: ElementRef
  ) {
  }
  ngOnInit() {
    this.src.sb = this.selectBox(this.src);
    this.src.sb.setSelected(this.src);
  }
  //selectbox
  selectBox(param) {
    var sb = Object();
    sb.data = param.data;
    sb.show = false;
    sb.showclass = "sb-o";
    sb.watch = false;
    sb.keyval = "";
    sb.value = "";

    sb.setSelected = function (src) {
      for (var i in src.sb.data.option) {
        var iobj = src.sb.data.option[i];
        if (iobj.selected) {
          src.sb.value = iobj.value;
          break;
        }
      }
      if (src.control) {
        if (src.form.controls[src.control]){
          src.form.controls[src.control].setValue(src.sb.value);
        }
      }
    }
    sb.dropDown = function (event, src) {
      src.sb.show = !src.sb.show;
      event.preventDefault();
    }
    sb.optClick = function (event, current, src) {
      src.sb.value = current.value;
      src.sb.keyval = "";
      if (src.control) {
        src.form.controls[src.control].setValue(current.value);
      }
      src.sb.show = false;
    }
    sb.mouseout = function (event, src) {
      src.sb.watch = false;
      setTimeout(() => {
        if (!src.sb.watch) {
          src.sb.show = false;
        }
      }, 1000);
      event.preventDefault();
    }
    sb.mouseover = function (event, src) {
      src.sb.watch = true;
    }
    sb.keyup = function (event, src) {
      if (event.target.value) {
        src.sb.show = true;
      }
      src.sb.keyval = event.target.value;
    }
    sb.filter = function (data, src) {

      if (String(src.sb.keyval).match(/^(\s{0,})$/)) {
        return src.sb.data.option;
      }
      var _return = [];
      for (var i in data) {
        var iobj = data[i];
        var start = String(iobj.value).toLowerCase(), to = String(src.sb.keyval).toLowerCase();
        if (start.match(to)) {
          _return.push(iobj);
        }
      }
      return (_return.length) ? _return : data;
    }
    return sb;
  }
  //selectbox end

}
