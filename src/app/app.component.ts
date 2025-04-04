import { Component } from '@angular/core';
import { UserStorageService } from './core/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HotelWeb';
  isCustomerLoggedIn :boolean =UserStorageService.isCustomerLoggedIn();
  IsAdminLoggedIn:boolean=UserStorageService.isAdminLoggedIn();
  constructor(private router:Router){

  }
  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name ==="NavigationEnd"){
        this.isCustomerLoggedIn= UserStorageService.isCustomerLoggedIn();
        this.IsAdminLoggedIn= UserStorageService.isAdminLoggedIn();
      }
    })
  }
  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl('/')
  }
}
