import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    // moduleId: module.id,
    selector: 'app-radiobutton',
    templateUrl: 'radiobutton.component.html',
    styleUrls: ['radiobutton.component.css']
})
export class RadiobuttonComponent implements OnInit {

    @Input("src") src: any;
    constructor(
        private el: ElementRef
    ) {
    }
    ngOnInit() {
        this.src["rb"] = this.radioButton(this.src.data);
    }

    radioButton(param) {
        var method = Object();
        method.data = param;
        method.radioclick = function (event, src, item) {
            src.rb.activeReset(src.rb.data.option);
            item.checked = true;
            src.rb.data.value = event.target.value;
            if (src.control) {
                src.form.controls[src.control].setValue({ value: item.value, checked: item.checked });
            }
        }
        method.activeReset = function (items) {
            for (var i in items) {
                items[i].checked = false;
            }
        }
        method.getActive = function (items) {
            for (var i in items) {
                if (items.checked)
                    return items[i];
            }
        }
        method.setActive = function (item, src) {
            return (item.checked) ? 'ic-active' : '';
        }
        return method;
    }

}
