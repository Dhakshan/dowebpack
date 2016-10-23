import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
///////////////////////////////////////////////////////////////////////////////////
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
///////////////////////////////////////////////////////////////////////////////////
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
///////////////////////////////////////////////////////////////////////////////////
//other page related services...
import { FootercommonComponent } from './footercommon/footercommon.component';
import { FooterComponent } from './footer/footer.component';
import { Parallax } from "./directive/parallax.directive";
import { SelectboxComponent } from "./ui/selectbox/selectbox.component";
import { MultiselectComponent } from "./ui/multiselect/multiselect.component";
import { RadiobuttonComponent } from "./ui/radiobutton/radiobutton.component";
import { InputrangeComponent } from "./ui/inputrange/inputrange.component";
import { ToasterComponent } from "./ui/toaster/toaster.component";
import { LoaderComponent } from "./ui/loader/loader.component";
///////////////////////////////////////////////////////////////////////////////////
//Modal component
import { ModalSignupComponent,ModalForgotPasswordComponent,ModalLoginComponent,ModalMobileVerificationComponent,ModalNotificationComponent,ModalSuggestLocationComponent,ModalReferAOwnerComponent,ModalReferAFriendComponent, ModalResetPasswordComponent,ModalViewAgreementComponent, ModalHowItWorkVideoComponent } from "./common/modal/modal.component";
///////////////////////////////////////////////////////////////////////////////////
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS
];
///////////////////////////////////////////////////////////////////////////////////
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    ////////////////////////////////////////////////
    FootercommonComponent, FooterComponent, Parallax,
    SelectboxComponent, RadiobuttonComponent,
    InputrangeComponent,MultiselectComponent,
    ToasterComponent,LoaderComponent,
    //////////////////////////////////////////////// 
    //Modal component
    ModalSignupComponent,ModalForgotPasswordComponent,
    ModalLoginComponent,ModalMobileVerificationComponent,ModalNotificationComponent,ModalSuggestLocationComponent,ModalReferAOwnerComponent,ModalReferAFriendComponent, ModalResetPasswordComponent,ModalViewAgreementComponent,ModalHowItWorkVideoComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor() {
  }
}

