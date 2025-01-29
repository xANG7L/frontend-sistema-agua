import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { SharingDataService } from '../../services/sharing-data.service';

export interface AuthRequest {
  username: string;
  password: string;
}


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  auth: AuthRequest = {
    username: '',
    password: ''
  }

  ingresando: boolean = false;

  errors: any = {}

  constructor(
    private sharingData: SharingDataService,
  ) {
  }

  onSubmit(loginForm: NgForm) {
    this.sharingData.handlerLoginEventEmitter.emit({ username: this.auth.username, password: this.auth.password });
  }


}
