import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../adminServices/admin.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css']
})
export class UpdateRoomComponent {
  roomForm: FormGroup;
  roomId: number;
  imageFile: File | null = null;  // To store the selected image file

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      available: [false, Validators.required],
      imageUrl: [''],  // For the image URL, it's not required initially as it's handled by the file input
    });
    this.roomId = this.route.snapshot.params['id'];
    this.getRoomById();
  }

  // Get room details by ID
  getRoomById() {
    this.adminService.getRoomById(this.roomId).subscribe(res => {
      this.roomForm.patchValue(res);  // Fill form with room data
    });
  }

  // Handle file input for image
  onImageChange(event: any) {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.imageFile = file;  // Store the file
      this.roomForm.patchValue({ imageUrl: file.name });  // Optionally update the image URL field with file name
    }
  }

  // Submit form
  submitForm() {
    if (this.roomForm.valid) {
      const formData = new FormData();
      
      // Convert the form data into a JSON string and append it as 'roomDto'
      const roomDto = {
        name: this.roomForm.get('name')?.value,
        type: this.roomForm.get('type')?.value,
        price: this.roomForm.get('price')?.value,
        available: this.roomForm.get('available')?.value
      };
      formData.append('roomDto', JSON.stringify(roomDto));  // Room data as a JSON string
  
      // Add the image file
      if (this.imageFile) {
        formData.append('image', this.imageFile as Blob);  // Add the image file
      }
  
      // Send the request
      this.adminService.updateRoom(this.roomId, formData).subscribe(
        res => {
          console.log('Room updated successfully');
          this.router.navigate(['/admin/dashboard']);
        },
        err => {
          console.error('Error updating room', err);
        }
      );
    }
  }
  
  
}
