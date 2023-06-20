import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CartItemsComponent } from '../order/cart-items/cart-items.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cart', component: CartItemsComponent },
  // { path: 'add', component: DoctorAddComponen },
  // { path: 'edit/:id', component: DoctorEditComponent },

  // {
  //   path: 'dash',

  //   children: [
  //     { path: '', component: DashComponent },
  //     { path: 'docAppoint/:id', component: DocAppointComponent },
  //     { path: 'addpress/:id', component: AddpresComponent },
  //     { path: 'docPres/:id', component: DocPresComponent },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
