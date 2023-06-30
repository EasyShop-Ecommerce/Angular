import { Component } from '@angular/core';
import { Seller } from 'src/app/_Models/Seller';
import { SellerService } from 'src/app/_services/seller.service';
import { SellerAccountService } from 'src/app/seller-account/seller-account.service';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.css'],
})
export class SellerSidebarComponent {
  constructor(
    private authService: SellerAccountService,
    private sellerService: SellerService
  ) {}
  loggedInSeller: number;
  seller: any;
  bussiness: string;
  sellerName: string;
  ngOnInit(): void {
    this.loggedInSeller = this.authService.GetCurrentSeller();
    this.sellerService.getSellerById(this.loggedInSeller).subscribe((data) => {
      console.log(data);
      this.seller = data;
      console.log(this.seller.businessName);
      console.log(this.seller.firstName);

      this.bussiness = this.seller.businessName;
      this.sellerName = this.seller.firstName;
    });
  }
}
