import { Component } from '@angular/core';
import { AdminService } from '../../adminServices/admin.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  currentPage = 1;
  reservations = [];
  total: number = 0;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private adminService: AdminService) {
    this.getReservations();
  }

  getReservations() {
    this.adminService.getReservations(this.currentPage - 1).subscribe(
      (res) => {
        console.log(res);
        this.reservations = res.reservationDtoList; // Adjust according to your API response structure
        this.total = res.totalPages * 1;
      },
      (error) => {
        this.displayMessage('Error loading reservations. Please try again.', 'error');
      }
    );
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getReservations();
  }
  updateReservationStatus(reservationId: number, status: string): void {
    if (confirm(`Are you sure you want to ${status.toLowerCase()} this reservation?`)) {
      this.adminService.changeReservationStatus(reservationId, status).subscribe(
        () => {
          this.displayMessage(
            `Reservation status changed to ${status.toUpperCase()} successfully!`,
            'success'
          );
          this.getReservations(); // Refresh the list after status change
        },
        (error) => {
          this.displayMessage(
            `Failed to change the reservation status. Please try again.`,
            'error'
          );
          console.error(error);
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
}
