import {Component,Input, ElementRef} from "@angular/core";

@Component({
    selector : "modal-signup",
    templateUrl : "form-signup.html"
})

export class ModalSignupComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-forgot-password",
    templateUrl : "forgot-password.html"
})

export class ModalForgotPasswordComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-login",
    templateUrl : "login.html"
})

export class ModalLoginComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-mobile-verification",
    templateUrl : "otp.html"
})

export class ModalMobileVerificationComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-reset-password",
    templateUrl : "reset-password.html"
})

export class ModalResetPasswordComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-notification",
    templateUrl : "notification-modal.html"
})

export class ModalNotificationComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-suggest-location",
    templateUrl : "suggest-location.html"
})

export class ModalSuggestLocationComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-refer-owner",
    templateUrl : "refer-a-owner.html"
})

export class ModalReferAOwnerComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-refer-friend",
    templateUrl : "refer-a-friend.html"
})

export class ModalReferAFriendComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-view-agreement",
    templateUrl : "signup-agreement.html"
})

export class ModalViewAgreementComponent{
    @Input() src:any;
    constructor(){}
}

@Component({
    selector : "modal-how-it-work-video",
    templateUrl : "how-it-work-video.html"
})

export class ModalHowItWorkVideoComponent{
    @Input() src:any;
    constructor(){}
}

