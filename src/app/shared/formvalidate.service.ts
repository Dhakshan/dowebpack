import { Injectable } from '@angular/core';
import { Form, FormBuilder,Validators, FormControl } from '@angular/forms';
@Injectable()
export class FormvalidateService {

constructor(
){}

   isDummy(control:FormControl){
       return null;
   }
   isRequired(control:FormControl){
        if(String(control.value).match(/^\s{0,}$|false/)){
            return {
                "errfor" : "required",
                "err":true,
                "msg" : "Please enter required field." 
            };
        }
        return null;
    }
    isAddress(control:FormControl){
        var avoidchar =  String(control.value).replace(/[0-9a-z\s\.,]/ig,"");
        if(avoidchar != ""){
            return {
                "errfor" : "isAddress",
                "err":true,
                "msg" : "Please enter valid characters." 
            };
        }
        return null;
    }
    isNumber(control:FormControl){
        if(String(control.value).match(/^[0-9]{0,}$/)==null){
            return {
                "errfor" : "isNumber",
                "err":true,
                "msg" : "Please enter numbers only." 
            };
        }
        return null;
    }
    isNumbers(control:FormControl){
        if(String(control.value).match(/^[0-9]{0,}(\s)([0-9]{0,})$/)==null){
            return {
                "errfor" : "isNumber",
                "err":true,
                "msg" : "Please enter numbers only." 
            };
        }
        return null;
    }
    isAlpha(control:FormControl){
        if(String(control.value).match(/^[a-z]{0,}$/i)==null){
            return {
                "errfor" : "isAlpha",
                "err":true,
                "msg" : "Please enter alphabet only." 
            };
        }
        return null;
    }
    isPincode(control:FormControl){
        if(String(control.value).match(/^[0-9]{6}$/)==null){
            return {
                "errfor" : "isPincode",
                "err":true,
                "msg" : "Please enter valid pincode." 
            };
        }
        return null;
    }
    isEmailFormat(control:FormControl){
        var pattern = [
                /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/,
                /(http|www)\..{0,}\..{0,}@/
            ],
        condition = {
            "0" : (String(control.value).match(pattern[0])==null),
            "1" : (String(control.value).match(pattern[1]))
            }, matched = false;
        for (var mi in condition ) {
            if (condition[mi] && !matched) {
                matched = true;
                break;
            }
        }
        if(matched){
            return {
                "errfor" : "emailFormat",
                "err":true,
                "msg" : "Invalid email id."
            };
        }
        return null;
    }
    mobilePhone(control:FormControl){
        var mobilepattern = {
            "1" : /^0{10}|1{10}|2{10}|3{10}|4{10}|5{10}|6{10}|7{10}|8{10}|9{10}$/,
            "2" : /^0123456789$/,
            "3" : /^1234567890$/,
            "4" : /^123456789$|^012345678$/,
            "5" : /^12345678$|^01234567$/,
            "6" : /^12345|^012345|^1234|^01234/,
            "7" : /[a-z\s]/gi,
            "8" : /^[0-9]{1}$|^[0-9]{2}$|^[0-9]{3}$|^[0-9]{4}$|^[0-9]{5}$|^[0-9]{6}$|^[0-9]{7}$|^[0-9]{8}$|^[0-9]{9}$/
        };
        var matched = false;
        for (var mi in mobilepattern ) {
            if (String(control.value).match(mobilepattern[mi]) && !matched) {
                matched = true;
                break;
            }
        }
        if(matched){
            return {
                "errfor" : "mobilePhone",
                "err":true,
                "msg" : "Invalid mobile number."
            };
        }
        return null;
    }
    passwordStrength(control : FormControl){
        if(String(control.value).match(/^.{8,}$/)==null){
            return {
                "errfor" : "passwordStrength",
                "err":true,
                "msg" : "Please enter strong password."
            };
        }
        return null;
    }
    passwordCompare(left,right){
        if(left != right){
            return {
                "errfor" : "passwordCompare",
                "err":true,
                "msg" : "Mismatched password."
            };
        }
        return null;
    }
}
