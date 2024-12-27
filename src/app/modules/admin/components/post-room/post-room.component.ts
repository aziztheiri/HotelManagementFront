import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../adminServices/admin.service';

@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrls: ['./post-room.component.css']
})
export class PostRoomComponent {
  roomForm: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    } else {
      this.selectedImage = null; // Reset if no file is selected
    }
  }

  onSubmit() {
    if (this.roomForm.valid && this.selectedImage) {
      const formData = this.prepareFormData();
      this.submitForm(formData);
    } else {
      this.displayMessage('Please fill out the form correctly and select an image.', 'error');
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const roomDto = {
      name: this.roomForm.value.name,
      type: this.roomForm.value.type,
      price: this.roomForm.value.price,
    };
    formData.append('roomDto', JSON.stringify(roomDto)); // Add the form data as JSON
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    return formData;
  }
  
  private submitForm(formData: FormData) {
    this.adminService.postRoom(formData).subscribe(
      () => {
        this.displayMessage('Room added successfully!', 'success');
        setTimeout(() => this.router.navigateByUrl('/admin/dashboard'), 3000);
      },
      () => {
        this.displayMessage('An error occurred while adding the room. Please try again.', 'error');
      }
    );
  }

  private displayMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    if (type === 'success') {
      setTimeout(() => (this.message = ''), 3000);
    }
  }
}
