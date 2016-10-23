import {Component, OnInit, Input,ElementRef} from "@angular/core";


@Component({
//   moduleId: module.id,
  selector: 'app-multiselect',
  templateUrl: 'multiselect.component.html',
  styleUrls: ['multiselect.component.css']
})
export class MultiselectComponent implements OnInit {

    @Input() src:any;
    constructor(
        private el:ElementRef
    ){
    }
    ngOnInit(){
        this.selectboxAssign();
    }
    selectboxAssign(){
        setTimeout(()=>{
            this.src["sb"] = this.selectBox(this.src.data);
            this.src.sb.joinvalue(this.src);
        },10);
    }
    //selectbox
    selectBox(param){
        var sb = Object(),_param = param||{option:[]};
        sb.data = _param;
        sb.show = false;
        sb.showclass = "sb-o";
        sb.watch = false;
        sb.keyval = "";
        sb.value = "";
        sb.isAnySelected = false;
        sb.open = function(src){
            return (src.sb.show)?src.sb.showclass:'';
        }
        sb.dropDown = function(event,src){
            src.sb.show = !src.sb.show;
            event.preventDefault(); 
        }
        sb.joinvalue = function(src){
            var joinstring = "";
            for(var i in src.sb.data.option){
                var iobj = src.sb.data.option[i];
                if(iobj.selected){
                    joinstring += iobj.value+", ";
                }
            }
            src.sb.value = String(joinstring).replace(/[,](\s)$/,"");
            src.sb.isAnySelected = (src.sb.value!="");
            if(src.control){
                src.form.controls[src.control].setValue(src.sb.value);
            }
        }
        sb.optClick = function(event,current,src){
            src.sb.value = src.sb.bindvalue(event,src);
            current.selected = true;
            src.sb.keyval = "";
            if(src.control){
                src.form.controls[src.control].setValue(src.sb.value);
            }
            src.sb.joinvalue(src);
            src.sb.show = false;
        }
        sb.showselected = function(event,src){
            src.sb.isshowselected = !src.sb.isshowselected; 
        }
        sb.mouseout = function(event,src){
            src.sb.watch = false;
            setTimeout(()=>{
                if(!src.sb.watch){
                    src.sb.show = false;
                    src.sb.keyval = "";
                }
            },200);
            event.preventDefault();
        }
        sb.mouseover = function(event,src){
            src.sb.watch = true;
        }
        sb.keyup = function(event,src){
            if(event.target.value){
                src.sb.show = true;
            }
            src.sb.keyval = event.target.value;
        }
        sb.filter = function(src){
            var limit = src.sb.data.limit||src.sb.data.option.length;
            if(String(src.sb.keyval).match(/^(\s{0,})$/)){
                // src.sb.show = false;
                return [];
            }
            var _return = [],data = src.sb.data.option;
            for(var i in data){
                var iobj = data[i];
                var start = String(iobj.value).toLowerCase(), to = String(src.sb.keyval).toLowerCase();
                var pattern = new RegExp("^"+to+"");
                if(start.match(pattern) && !iobj.selected){
                    _return.push(iobj);
                }
            }
            limit = (src.sb.getSelectCount(src)==limit)?0:limit;
            return _return.slice(0,limit);
        }
        sb.filterBy = function(data,src,find){
            var _return = [];
            for(var i in find){
                var iobj = find[i];
                for(var j in data){
                    var jobj = data[j];
                    if(jobj[iobj.name] == iobj.value){
                        _return.push(jobj);
                    }
                }
            }
            return _return;
        }
        sb.bindvalue = function(event,src){
            src.sb.joinvalue(src);
        }
        sb.focus = function(event,src){
            src.sb.value='';
        }
        sb.getSelectCount = function(src){
            var cnt=[]
            for(var i in src.sb.data.option){
                if(src.sb.data.option.selected){
                    cnt.push(i);
                }
            }
            return cnt.length;
        }
        sb.optDelete = function(event,current,src){
            current.selected = false;
            src.sb.joinvalue(src);
            event.preventDefault();
        }
        sb.suggestPlaceholder = function(src){
            var cond = src.suggestion && src.sb.filter(src).length==0 && src.sb.keyval;
            // if(!src.sb.keyval && !src.sb.getSelectCount(src)){
            //     src.sb.show = false;
            // }
            return cond;
        }
        return sb;
    }
    //selectbox end
}