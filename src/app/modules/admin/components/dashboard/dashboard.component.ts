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
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
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

onDelete(roomId: number) {
  if (confirm('Are you sure you want to delete this room?')) {
    this.adminService.deleteRoom(roomId).subscribe(
      () => {
        this.displayMessage('Room deleted successfully!', 'success');
        this.rooms = this.rooms.filter((room) => room.id !== roomId); // Remove from list
      },
      () => {
        this.displayMessage('Error deleting the room. Please try again.', 'error');
      }
    );
  }
}
private displayMessage(message: string, type: 'success' | 'error') {
  this.message = message;
  this.messageType = type;
  if (type === 'success') {
    setTimeout(() => (this.message = ''), 3000);
  }
}

changePage(page: number) {
  this.currentPage = page;
  this.getRooms();
}

}
