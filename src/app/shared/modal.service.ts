import { Injectable, Input, ElementRef } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Http, Response } from "@angular/http";
import { CommonService, FormvalidateService} from "../shared";

@Injectable()

export class ModalService {
  constructor(
    private el : ElementRef,
    private http: Http,
    private fb : FormBuilder,
    private fv : FormvalidateService,
    private cs : CommonService
  ) {
    this.self();
  }
  self(){
    var cs = this.cs;
    var fv = this.fv;
    var fb = this.fb;
    cs.fn("modallist",[]);
    cs.fn("modalOpen",function(param){
        var isModal = cs.fn(param.name);
        cs["modallist"] = (String(param.other).match(/false/))?[]:cs["modallist"];
        if(isModal){
            isModal.show = param.show||param.status;
            isModal.callback = param.callback||null;
            cs["modallist"].push(isModal);
            cs.fn("body scroll of",true);
        }
        if(param.event){
            param.event.preventDefault();
        }
        return false;
    })
    cs.fn("modalClose",function(param){
        var modallist = cs["modallist"],isModal = cs.fn(param.name);
        if(isModal && modallist.length){
            for(var i in modallist){
                var iobj = modallist[i];
                if(iobj.name==param.name){
                    iobj.show = false;
                    modallist.slice(i,0);
                }
            }
        }
        cs.fn("body scroll of",false);
        if(param.event){
            param.event.preventDefault();
        }
        return false;
    })
    cs.fn("modalExtend",function(obj){
        var fn = function(){},
            fns = {
                _this : cs,
                validate : cs["formValidate"]||fn,
                formBlur : cs["formBlur"]||fn,
                submit : cs["formSubmit"]||fn,
                formKeyup: cs["setInputKeyup"]||fn
            };
        return Object.assign(obj,fns);
    })
    cs.fn("modalSubmitCallback",function(src) {
        if (src.callback && typeof src.callback.call === "function") {
            src.callback.call(src.callback);
        }
    });
    cs.fn("signupModal",function(){
      var obj = {
            toaster: { theme: "white" },
            url: "./app/common/modal/form-signup.html",
            name: "signupModal",
            show: false,
            sizes: "mini center",
            theme: "secondary",
            header: true,
            title: "Sign Up",
            formSuccess: {
                msg: "Registration successfully completed.<br/>Thank you for registering!"
            },
            errorMsg: {
                name: {
                    "required": "Please enter name."
                },
                email: {
                    "required": "Please enter email id.",
                    "emailFormat": "Please enter valid email."
                },
                mobile: {
                    "required": "Please enter mobile number.",
                    "mobilePhone": "Please enter valid mobile no."
                },
                password: {
                    "required": "Please enter password.",
                    "passwordStrength": "Password minimum 8 character required."
                },
                captcha: {
                    "required": "Please enter captcha.",
                    "mismatch": "Please match the captcha."
                },
                iagree: {
                    "required": "Please choose I Agree."
                }
            },
            form: fb.group({
                name: fb.control("", Validators.compose([fv.isRequired])),
                email: fb.control("", Validators.compose([fv.isEmailFormat, fv.isRequired])),
                mobile: fb.control("", Validators.compose([fv.isRequired, fv.mobilePhone])),
                password: fb.control("", Validators.compose([fv.passwordStrength, fv.isRequired])),
                captcha: fb.control("", Validators.compose([fv.isRequired])),
                iagree: fb.control("", Validators.compose([fv.isRequired]))
            })
        };
        return cs.fn("modalExtend",obj); 
    });
    cs.fn("signupModalSubmit",function(event,src){
        var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src._this.fn("onHttp", {
                url: cs.fn("local", "urls").captcha,
                body: {},
                callback: function (param: any) {
                if (param.json.captcha.value != formData.captcha) {
                            src._this.makeToaster({
                                "theme": "error",
                                "msg": src.errorMsg.captcha.mismatch,
                                stay: 5000
                            });
                        } else {
                            src.loader = src.formsent = true;
                            src._this.makeToaster({
                                theme: src.toaster.theme,
                                "msg": src.formSuccess.msg,
                                stay: 50000
                            });
                            src._this.modalSubmitCallback(src);
                        }
                }
            });
        }
    });
    cs.fn("loginModal",function(){
        var obj = {
            toaster: { theme: "white" },
            url: "./app/common/modal/login.html",
            name: "loginModal",
            show: false,
            sizes: "mini center",
            theme: "secondary",
            header: true,
            title: "Log In",
            form: fb.group({
                email: fb.control("", Validators.compose([fv.isEmailFormat, fv.isRequired])),
                password: fb.control("", Validators.compose([fv.passwordStrength, fv.isRequired]))
            }),
            formSuccess: {
                msg: "Logged in successfully!"
            },
            errorMsg: {
                email: {
                    "required": "Please enter email id.",
                    "emailFormat": "Please enter valid email."
                },
                password: {
                    "required": "Please enter password.",
                    "passwordStrength": "Password minimum 8 character required."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    });
    cs.fn("loginModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src.loader = src.formsent = true;
            src._this.makeToaster({
                theme: src.toaster.theme,
                "msg": src.formSuccess.msg,
                stay: 5000
            });
            src._this.app.logger = {
                "name": "John Doe",
                "logged": true
            }
            this.modalSubmitCallback(src);
            src.loader = src.formsent = false;
            src._this.modalClose({
                "name": src.name,
                "show": false,
                "other": false
            });
        }
    });
    cs.fn("forgotPasswordModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/forgot-password.html",
            name: "forgotPasswordModal",
            show: false,
            sizes: "small center",
            theme: "secondary",
            header: false,
            title: "Read sign up agreement",
            form: fb.group({
                email: fb.control("", fv.isDummy),
                mobile: fb.control("", fv.isDummy),
            }),
            formSuccess: {
                msg: "",
                email: "<p class='margin-b5px'>Please check your email</p><p>We sent reset password link to your email address.</p>",
                mobile: "<p class='margin-b5px'>Please check your mobile.</p><p>We sent OTP Number to your mobile.</p>"
            }, 
            errorMsg: {
                "common": {
                    "required": "Please enter email or mobile."
                },
                email: {
                    "required": "Please enter email id.",
                    "emailFormat": "Please enter valid email."
                },
                mobile: {
                    "required": "Please enter mobile number.",
                    "mobilePhone": "Please enter valid mobile no."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("forgotPasswordModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        var email = src.form.controls.email, mobile = src.form.controls.mobile, noempty = (String(email.value + mobile.value).match(/^\s{0,}$/) == null);
        var isSuccess = false;
        if (src.formtype && noempty) {
            if (src.formtype == "email") {
                var validate = fv.isEmailFormat(src.form.controls.email);
                if (validate) {
                    src._this.makeToaster({
                        "theme": "error",
                        "msg": src.errorMsg.email.emailFormat,
                        stay: 5000
                    });
                }
                isSuccess = (validate) ? false : true;
            }
            if (src.formtype == "mobile") {
                var validate = fv.mobilePhone(src.form.controls.mobile);
                if (validate) {
                    src._this.makeToaster({
                        "theme": "error",
                        "msg": src.errorMsg.mobile.mobilePhone,
                        stay: 5000
                    });
                }
                isSuccess = (validate) ? false : true;
            }
            if (isSuccess) {
                src.formsent = true;
                src.loader = true;
                src.formSuccess.msg = src.formSuccess[src.formtype];
                src._this.makeToaster({
                    theme: "secondary",
                    "msg": src.formSuccess.msg,
                    stay: 5000
                });
                setTimeout(() => {
                    src.formsent = false;
                    src.loader = false;
                    if (src.formtype == "mobile") {
                        src._this.modalOpen({
                            "name": "mobileVerificationModal",
                            "show": true,
                            "other": false
                        });
                    }
                    if (src.formtype == "email") {
                        src._this.modalClose({
                            "name": src.name,
                            "show": false,
                            "other": false
                        });
                    }
                }, 6000);
            }
        } else {
            src._this.makeToaster({
                "theme": "error",
                "msg": src.errorMsg.common.required,
                stay: 5000
            });
        }
    });
    cs.fn("mobileVerificationModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/otp.html",
            name: "mobileVerificationModal",
            show: false,
            sizes: "small center",
            theme: "secondary",
            header: false,
            title: "Mobile Verification",
            form: fb.group({
                otp: fb.control("", Validators.compose([fv.isRequired, fv.isNumber])),
            }),
            formSuccess: {
                msg: "Your reset password process intiated. Please wait.."
            },
            errorMsg: {
                "otp": {
                    "required": "Please enter OTP Number."
                }
            }
        }
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("mobileVerificationModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src.loader = src.formsent = true;
            src._this.makeToaster({
                theme: "secondary",
                "msg": src.formSuccess.msg,
                stay: 5000
            });
            setTimeout(() => {
                src.loader = src.formsent = false;
                src._this.modalOpen({
                    "name": "resetPasswordModal",
                    "show": true,
                    "other": false
                });
            }, 4000);
        }
    })
    cs.fn("missedCallControl",function(event, src) {
        src.loader = src.formsent = true;
        src._this.makeToaster({
            theme: "secondary",
            "msg": src.formSuccess.msg,
            stay: 5000
        });
        setTimeout(() => {
            src.loader = src.formsent = false;
            src._this.modalOpen({
                "name": "resetPasswordModal",
                "show": true,
                "other": false
            });
        }, 4000);
        event.preventDefault();
    })
    cs.fn("resetPasswordModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/reset-password.html",
            name: "resetPasswordModal",
            show: false,
            sizes: "mini center",
            theme: "secondary",
            header: true,
            title: "Reset Password",
            form: fb.group({
                password: fb.control("", Validators.compose([fv.passwordStrength, fv.isRequired])),
                confirmpassword: fb.control("", Validators.compose([fv.isRequired])),
            }),
            formSuccess: {
                msg: "Your password resetted successfully."
            },
            errorMsg: {
                "password": {
                    "required": "Please enter password.",
                    "passwordStrength": "Password minimum 8 character required.",
                    "mismatch": "Password & Confirm Password mismatched."
                },
                "confirmpassword": {
                    "required": "Please enter confirm password.",
                    "mismatch": "Password & Confirm Password mismatched."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("resetPasswordModalSubmit",function(event, src) {
        var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            var validate = fv.passwordCompare(formData.password, formData.confirmpassword);
            if (validate) {
                src.formError = validate;
                src.formError.msg = src.errorMsg.password.mismatch;
            } else {
                src.loader = src.formsent = true;
                src._this.makeToaster({
                    theme: "secondary",
                    "msg": src.formSuccess.msg,
                    stay: 5000
                });
                setTimeout(() => {
                    src.loader = src.formsent = false;
                    src._this.modalOpen({
                        "name": "loginModal",
                        "show": true,
                        "other": false
                    })
                }, 2000);
            }
        }
    })
    cs.fn("viewAgreementModal",function(){
        var obj = {
                _this : cs,
                url: "./app/common/modal/signup-agreement.html",
                name: "viewAgreementModal",
                show: false,
                sizes: "medium center",
                theme: "secondary",
                header: true,
                title: "Read sign up agreement"
            };
        return obj; 
    });
    cs.fn("howItWorkVideoModal",function(){
        var obj = {
            _this : cs,
            url: "./app/common/modal/how-it-work-video.html",
            name: "howItWorkVideoModal",
            show: false,
            sizes: "full full-height center",
            theme: "secondary",
            header: false,
            title: "How It Works"
        };
        return obj;
    })
    cs.fn("referAFriendModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/refer-a-friend.html",
            name: "referAFriendModal",
            show: false,
            sizes: "mini center",
            theme: "secondary",
            header: true,
            title: "Refer A Friend",
            form: fb.group({
                friendname: fb.control("", Validators.compose([fv.isRequired])),
                friendemail: fb.control("", Validators.compose([fv.isEmailFormat, fv.isRequired])),
                friendmobileno: fb.control("", Validators.compose([fv.isRequired, fv.mobilePhone]))
            }),
            formSuccess: {
                msg: "Thank you for referring a friend."
            },
            errorMsg: {
                friendname: {
                    required: "Please enter friend name",
                },
                friendemail: {
                    required: "Please enter friend email id",
                    emailFormat: "Please enter valid email id."
                },
                friendmobileno: {
                    required: "Please enter friend mobile no.",
                    mobilePhone: "Please enter valid mobile no."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("referAOwnerModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/refer-a-owner.html",
            name: "referAOwnerModal",
            show: false,
            sizes: "mini center",
            theme: "secondary",
            header: true,
            title: "Refer A Owner",
            form: fb.group({
                honame: fb.control("", Validators.compose([fv.isRequired])),
                hoemail: fb.control("", Validators.compose([fv.isEmailFormat])),
                homobileno: fb.control("", Validators.compose([fv.isRequired, fv.mobilePhone])),
                hoaddress: fb.control("", Validators.compose([fv.isRequired, fv.isAddress])),
                hocity: fb.control("", Validators.compose([fv.isRequired, fv.isAddress])),
                hopincode: fb.control("", Validators.compose([fv.isPincode, fv.isRequired]))
            }),
            formSuccess: {
                msg: "Thank you for referring a owner."
            },
            errorMsg: {
                honame: {
                    required: "Please enter house owner name."
                },
                hoemail: {
                    emailFormat: "Please enter valid email id."
                },
                homobileno: {
                    required: "Please enter house owner mobile no.",
                    mobilePhone: "Please enter valid mobile no."
                },
                hoaddress: {
                    required: "Please enter house address which you referring here.",
                    isAddress: "Please avoid special characters."
                },
                hocity: {
                    required: "Please enter city.",
                    isAddress: "Please avoid special characters."
                },
                hopincode: {
                    required: "Please enter pincode.",
                    isNumber: "Please enter numbers only.",
                    isPincode: "Please enter 6 digit pincode."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("referAFriendModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src.loader = true;
            src._this.makeToaster({
                theme: "secondary",
                "msg": src.formSuccess.msg,
                stay: 5000
            });
            setTimeout(() => {
                src.loader = false;
                src._this.modalClose({
                    "name": src.name,
                    "show": false,
                    "other": false
                })
            }, 2000);
        }
    })
    cs.fn("referAOwnerModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src.loader = true;
            src._this.makeToaster({
                theme: "secondary",
                "msg": src.formSuccess.msg,
                stay: 5000
            });
            setTimeout(() => {
                src.loader = false;
                src._this.modalClose({
                    "name": src.name,
                    "show": false,
                    other:false
                })
            }, 2000);
        }
    })
    cs.fn("suggestLocationModal",function(){
        var obj = {
            toaster: { theme: "secondary" },
            url: "./app/common/modal/suggest-location.html",
            name: "suggestLocationModal",
            show: false,
            sizes: "medium center",
            theme: "secondary",
            header: false,
            title: "Suggest Your Desired Location",
            form: fb.group({
                location: fb.control("", Validators.compose([fv.isRequired, fv.isAddress])),
                name: fb.control("", Validators.compose([fv.isRequired])),
                email: fb.control("", Validators.compose([fv.isEmailFormat, fv.isRequired])),
                mobileno: fb.control("", Validators.compose([fv.isRequired, fv.mobilePhone]))
            }),
            formSuccess: {
                msg: "Thank you for suggesting location. Soon! we will update you."
            },
            errorMsg: {
                name: {
                    required: "Please enter name."
                },
                email: {
                    required: "Please enter email id.",
                    emailFormat: "Please enter valid email id."
                },
                mobileno: {
                    required: "Please enter mobile no.",
                    mobilePhone: "Please enter valid mobile no."
                },
                location: {
                    required: "Please enter desired location",
                    isAddress: "Please avoid special characters."
                }
            }
        };
        return cs.fn("modalExtend",obj); 
    })
    cs.fn("suggestLocationModalSubmit",function(event, src) {
        // var formData = src.form.value;
        src.formsubmit = true;
        if (!src.formError) {
            src.loader = true;
            src._this.makeToaster({
                theme: "secondary",
                "msg": src.formSuccess.msg,
                stay: 5000
            });
            setTimeout(() => {
                src.loader = false;
                src._this.modalClose({
                    "name": src.name,
                    "show": false,
                    other:false
                })
            }, 2000);
        }
    })
    cs.fn("notificationModal",function(){
        var obj = {
            _this : cs,
            url: "./app/common/modal/notification-modal.html",
            name: "notificationModal",
            show: false,
            sizes: "medium",
            theme: "secondary",
            header: false,
            title: "Notification Modal",
        };
        return obj;
    })
    return cs;
  }
}
