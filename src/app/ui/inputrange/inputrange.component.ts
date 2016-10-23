import { Component, OnInit , Input, ElementRef} from '@angular/core';

@Component({
//   moduleId: module.id,
  selector: 'app-inputrange',
  templateUrl: 'inputrange.component.html',
  styleUrls: ['inputrange.component.css']
})
export class InputrangeComponent implements OnInit {
    @Input() src: any;
    constructor(
        private el: ElementRef
    ) {
    }
    ngOnInit() {
        this.inputRangeAssign();
    }
    inputRangeAssign(){
        this.src["irange"] = this.inputRange(this.src.data);
        if(this.src.irange.setInitValue){
            this.src.irange.setValue(this.src);
        }
    }
    //selectbox
    inputRange(param) {
        var irange = Object();
        irange.data = param;
        irange.data.init = irange.data.init || 0;
        irange.data.value = irange.data.value || { min: 0, max: irange.data.range };

        irange.increment = function (event, buttonOf, src) {
            if (buttonOf == "min") {
                src.irange.data.value.min -= 1000;
            }
            if (buttonOf == "max") {
                src.irange.data.value.min += 1000;
            }
            src.irange.setInitValue = true;
            src.irange.setValue(src);
            event.preventDefault();
        }
        irange.setValue = function (src) {
            if(src.irange.setInitValue){
                src.irange.data.value.min = Math.max(0, src.irange.data.value.min);
                src.irange.data.value.max = src.irange.data.value.min + src.irange.data.range;
                if(src.control){
                    src.form.controls[src.control].setValue(src.irange.data.value);
                }
            }
        }
        irange.minkeydown = function(event,src){
        }
        irange.minkeyup = function(event,src){
            var val = "",str = String(event.target.value).split("");
            if(event.target.value!=""){
                for(var i in str){
                    val += (String(str[i]).match(/[0-9]/))?str[i]:"";
                }
                event.target.value = val;
            }else{
                event.target.value = 0;
            }
            src.irange.data.value.min = val;
            src.irange.setInitValue = true;
            src.irange.setValue(src);
        }
        irange.minblur = function(event,src){
            event.target.value = (event.target.value=="")? (src.irange.data.value.max-src.irange.data.range):event.target.value; 
            // console.log(src.irange.data.value);
            src.irange.setValue(src);
        }
        return irange;
    }
}