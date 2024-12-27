import { Component } from '@angular/core';
import { AdminService } from '../../adminServices/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentPage = 1;
  rooms =[];
  total:any;
constructor(private adminService:AdminService){
  this.getRooms()
}
getRooms(){
  this.adminService.getRooms(this.currentPage-1).subscribe(res=>
  {
    console.log(res)
    this.rooms=res.roomDtoList;
    this.total =res.totalPages  *1;
  }
  )
}
onEdit(room: any) {
  console.log('Edit clicked for room:', room);
  // Implement your edit functionality here
}

onDelete(room: any) {
  console.log('Delete clicked for room:', room);
  // Implement your delete functionality here
}

changePage(page: number) {
  this.currentPage = page;
  this.getRooms();
}

}
