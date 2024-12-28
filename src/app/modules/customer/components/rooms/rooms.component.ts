import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {
 currentPage = 1;
  rooms =[];
  total:any;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
constructor(private customerService:CustomerService){
  this.getRooms()
}
getRooms(){
  this.customerService.getRooms(this.currentPage-1).subscribe(res=>
  {
    console.log(res)
    this.rooms=res.roomDtoList;
    this.total =res.totalPages  *1;
  }
  )
}
changePage(page: number) {
  this.currentPage = page;
  this.getRooms();
}
}
