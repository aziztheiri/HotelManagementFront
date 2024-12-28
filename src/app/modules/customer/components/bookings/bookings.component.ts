import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  currentPage = 1;
  bookings = [];
  totalPages: number = 1;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  loading: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getMyBookings();
  }

  // Fetch the user's bookings
  getMyBookings() {
    this.loading = true;
    const userId = UserStorageService.getUserId();
    this.customerService.getMyBookings(this.currentPage - 1).subscribe(
      res => {
        console.log(res)
        this.bookings = res.reservationDtoList;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error => {
        this.message = 'Error loading bookings';
        this.messageType = 'error';
        this.loading = false;
      }
    );
  }

  // Change the current page for pagination
  changePage(page: number) {
    this.currentPage = page;
    this.getMyBookings();
  }
}
