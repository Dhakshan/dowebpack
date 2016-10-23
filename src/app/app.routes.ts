import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';

// import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', redirectTo : "home", pathMatch : "full" },
  { path: 'home',  component: HomeComponent },
  { path: '**',    component: NoContentComponent },
];
