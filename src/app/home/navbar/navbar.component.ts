import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subcategory } from 'src/app/_Models/Subcategory';
import { CartService } from 'src/app/_services/cart.service';
import { ProductSearchServiceService } from 'src/app/_services/product-search.service';
import { SearchbycatService } from 'src/app/_services/searchbycat.service';
import { SubSubcategoryService } from 'src/app/_services/sub-category.service';
import { CustomerAccountService } from 'src/app/customer-account/customer-account.service';
import { SearchByCatComponent } from 'src/app/product/search-by-cat/search-by-cat.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  searchControl!: FormControl;
  isShowDiv: boolean = true;
  isfashion: boolean = true;
  ishome: boolean = true;
  issub: boolean = true;
  isSidebarOpen = false;
  isbutton = false;
  subcategories: Subcategory[] = [];
  selectedCategoryId: number | null = null;
  try: number = 0;
  cartItemCount = 0;

  constructor(
    private cartService: CartService,
    private productSearchService: ProductSearchServiceService,
    private router: Router,
    private subcategoryService: SubSubcategoryService,
    private bycatservice: SearchbycatService,
    public customerService: CustomerAccountService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
    this.subcategoryService.getAllSubcategories().subscribe((data) => {
      this.subcategories = data;
      console.log(this.subcategories);
    });

    this.cartItemCount = this.cartService.cartItems.length;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isbutton = !this.isbutton;
  }

  togglebutton() {
    this.isbutton = !this.isbutton;
  }

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  togglefashion() {
    this.isfashion = !this.isfashion;
  }
  togglehome() {
    this.ishome = !this.ishome;
  }
  togglesup() {
    this.issub = !this.issub;
  }

  updateSearchQuery(e: any): void {
    const query = e.target.value;
    console.log(query);
    this.productSearchService.setSearchQuery(query);
    this.router.navigate(['/search']);
  }

  onCategoryChange(categoryId: number | null): void {
    this.bycatservice.setSelectedCategoryId(categoryId);
    console.log(categoryId);
    this.router.navigate(['/searchCat']);
    console.log(categoryId);
  }

  order() {}
}
