import { Component } from '@angular/core';
import { Seller } from 'src/app/_Models/Seller';
import { SellerService } from 'src/app/_services/seller.service';
import { SellerAccountService } from 'src/app/seller-account/seller-account.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
})
export class SellerDashboardComponent {
  constructor(
    private authService: SellerAccountService,
    private sellerService: SellerService
  ) {}
  // loggedInSeller: number;
  // seller: Seller;
  // bussiness: string;
  ngOnInit(): void {
    // this.loggedInSeller = this.authService.GetCurrentSeller();
    // this.sellerService.getSellerById(this.loggedInSeller).subscribe((data) => {
    //   console.log(data);
    //   this.seller = data;
    //   console.log(this.seller.businessName);
    //   this.bussiness = this.seller.businessName;
    // });
  }

  logout() {
    this.authService.logout();
  }
}
