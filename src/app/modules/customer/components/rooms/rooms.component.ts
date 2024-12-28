import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

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
  showBookingModal: boolean = false;
  selectedRoomId: number | null = null;
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
bookingDetails = {
  userId: UserStorageService.getUserId(), // Replace this with the actual logged-in user ID
  roomId: 0,
  checkInDate: '',
  checkOutDate: '',
};
openBookingModal(roomId: number) {
  this.showBookingModal = true;
  this.bookingDetails.roomId = roomId;
}
closeBookingModal() {
  this.showBookingModal = false;
  this.bookingDetails.checkInDate = '';
  this.bookingDetails.checkOutDate = '';
}
bookRoom() {
  if (this.bookingDetails.checkInDate && this.bookingDetails.checkOutDate) {
    console.log(this.bookingDetails);

    this.customerService.bookRoom(this.bookingDetails).subscribe(
      () => {
        this.message = 'Room booked successfully!';
        this.messageType = 'success';
        this.closeBookingModal();
      },
      () => {
        this.message = 'An error occurred while booking the room.';
        this.messageType = 'error';
      }
    );
  } else {
    this.message = 'Please fill out all fields.';
    this.messageType = 'error';
  }
}
}
