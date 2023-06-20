import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { HomepageComponent } from './home/homepage/homepage.component';
import { PagesModule } from './pages/pages.module';

const routes: Routes = [
  {
    path: ' ',
    loadChildren: () =>
      import('./home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {path:"productDetails",component:PagesModule},
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then(
        (m) => m.PagesModule
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
