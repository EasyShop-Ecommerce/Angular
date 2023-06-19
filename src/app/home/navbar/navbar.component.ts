import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent    {

  isShowDiv:boolean=true
  isfashion:boolean=true
  ishome:boolean=true
  issub:boolean=true
  isSidebarOpen = false;
  isbutton=false;

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




   

