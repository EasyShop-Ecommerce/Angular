import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/_services/cart.service';

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

  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
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
}
